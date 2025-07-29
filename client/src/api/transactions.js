// client/src/api/transactions.js
// This file contains API calls related to transactions, such as creating, fetching, and summarizing transactions.

import api from "./axiosConfig";

export const createTransaction = (transaction) =>
  api.post("/transactions", transaction);

export const getTransactions = (params) => api.get("/transactions", { params });

export const getSummary = () => api.get("/transactions/summary");
export const getOverallSummary = (params) =>
  api.get("/transactions/overall-summary", { params });

export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export const extractReceipt = (formData) =>
  api.post("/receipts/extract", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTransaction = (id, transaction) =>
  api.put(`/transactions/${id}`, transaction);
