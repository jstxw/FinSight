
const xlsx = require('xlsx');
const Income = require("../models/Income");
const path = require('path');
const fs = require('fs');

// Add income sources
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
        } catch (error) {
        res.status(500).json({ message: "Server Error" });
        }
    };

//Get all income sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    }catch (error){
        res.status(500).json({message: "Server Error"})
    }
};

//Delete income sources
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.findOneAndDelete({
            _id: req.params.id,
            userId: userId
        });

        if (!income) {
            return res.status(404).json({ message: "Income not found or not authorized" });
        }

        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Download income excel sheets
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date: -1 });

        //Prepare data for excel 
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date, // fixed typo from item.data to item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Use absolute path in uploads directory
        const filePath = path.join(__dirname, '../uploads/income_details.xlsx');
        xlsx.writeFile(wb, filePath);

        res.download(filePath, 'income_details.xlsx', (err) => {
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