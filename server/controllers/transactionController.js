import Transaction from "../models/Transaction.model.js";
import mongoose from "mongoose";

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
export async function createTransaction(req, res) {
  try {
    const { type, amount, category, description, date } = req.body;

    // Create a transaction document linked to the logged-in user
    const transaction = new Transaction({
      user: req.user.id, // User ID from JWT
      type,
      amount,
      category,
      description,
      date: date || Date.now(), // Use provided date or current date
    });

    // Save transaction to database
    await transaction.save();

    res.status(201).json(transaction); // Return the created transaction
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// @desc    Get transactions with filters and pagination
// @route   GET /api/transactions
// @access  Private
export async function getTransactions(req, res) {
  try {
    const { startDate, endDate, type, page = 1, limit = 10 } = req.query;
    const query = { user: req.user.id }; // Filter only user’s transactions

    // Apply date filter if both start and end dates are provided
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Apply type filter (income/expense)
    if (type) query.type = type;

    // Fetch filtered transactions with sorting, pagination
    const transactions = await Transaction.find(query)
      .sort("-date") // Latest first
      .skip((page - 1) * limit) // Skip for pagination
      .limit(parseInt(limit));

    // Count total transactions for pagination info
    const count = await Transaction.countDocuments(query);

    res.json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page), //it Shows which page the API is currently returning
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// @desc    Get expense summary by category and date (for charts)
// @route   GET /api/transactions/summary
// @access  Private
export async function getSummary(req, res) {
  try {
    // Match only this user's expenses
    const baseMatch = {
      user: new mongoose.Types.ObjectId(req.user.id),
      
    };

    // Group expenses by category
    const byIncome = await Transaction.aggregate([
      { $match: {...baseMatch,type:"income"} },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const byExpense = await Transaction.aggregate([
      { $match: {...baseMatch,type:"expense"} },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    // Group expenses by date
    const byDate = await Transaction.aggregate([
      { $match: baseMatch },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Format date
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date ascending
    ]);

    res.json({ byIncome, byExpense, byDate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// @desc    Get overall income, expenses, and net balance
// @route   GET /api/transactions/overall-summary
// @access  Private
export async function getOverallSummary(req, res) {
  try {
    const { startDate, endDate } = req.query;

    // Base query to match only current user's transactions
    const matchQuery = { user: new mongoose.Types.ObjectId(req.user.id) };

    // Apply date filters if provided
    if (startDate && endDate) {
      matchQuery.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Group transactions by type (income/expense) and sum amounts
    const summary = await Transaction.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$type", // Group by transaction type
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Initialize totals
    let totalIncome = 0;
    let totalExpense = 0;

    // Assign totals based on type
    summary.forEach((item) => {
      if (item._id === "income") {
        totalIncome = item.totalAmount;
      } else if (item._id === "expense") {
        totalExpense = item.totalAmount;
      }
    });

    // Calculate net balance
    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
}

export async function updateTransaction(req, res) {
  try {
    const { type, amount, category, description, date } = req.body;
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction Not Found" });
    }
    //only allow owner to edit
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorize to edit" });
    }

    //update the fileds
    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    const updateTransaction = await transaction.save();
    res.json(updateTransaction);
  } catch (err) {
    res.status(500).json({ message: "Server Error: " + err.message });
  }
}

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export async function deleteTransaction(req, res) {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Security Check: Ensure the user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
}
