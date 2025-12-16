
const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense sources
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
        } catch (error) {
        res.status(500).json({ message: "Server Error" });
        }
    };

//Get all expense categories
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    }catch (error){
        res.status(500).json({message: "Server Error"})
    }
};

//Delete Expense sources
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: userId
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or not authorized" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Download Expense excel sheets
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({userId}).sort({date: -1 });

        //Prepare data for excel 
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        const path = require('path');
        const fs = require('fs');
        const filePath = path.join(__dirname, '../uploads/expense_details.xlsx');
        xlsx.writeFile(wb, filePath);

        res.download(filePath, 'expense_details.xlsx', (err) => {
            if (err) {
                // Optionally handle error
            } else {
                // Optionally delete the file after sending
                // fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};