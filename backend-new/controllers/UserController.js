// controllers/UserController.js

const bcrypt = require('bcrypt');
const pool = require('../db/connectDB')();
var jwt = require('jsonwebtoken');

class UserController {

    static studentRegistration = async (req, res) => {
        try {
            const { courseId, name, email, contactNumber, gender, address, college, branch, qualification, semester } = req.body;

            const [courseData] = await pool.query(`SELECT courseName FROM courses WHERE course_id = ?`, [courseId])

            const courseName = courseData[0]?.courseName

            const [dataSaved] = await pool.query('INSERT INTO students SET ?', {
                courseId,
                courseName,
                name,
                email,
                contactNumber,
                gender,
                address,
                college,
                branch,
                qualification,
                semester,
            });

            if (dataSaved.affectedRows > 0) {
                res.status(201).json({ 'status': 'success', 'message': 'Registration Successful' });
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchRegisteredStudent = async (req, res) => {
        try {
            
            const [data] = await pool.query('SELECT * FROM students INNER JOIN courses ON students.courseId=courses.course_id ORDER BY student_id DESC');
    
            res.status(200).json({
                success: true,
                data
            });
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static register = async (req, res) => {
        try {
            const { name, email, mobileNumber, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const [isUserExist] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

            if (isUserExist.length > 0) {
                res.status(401).json({ 'status': 'failed', 'message': 'Email Already Registered' });
            } else {
                const [isUserExistWithMobileNumber] = await pool.query('SELECT * FROM users WHERE mobileNumber = ?', [mobileNumber]);

                if (isUserExistWithMobileNumber.length > 0) {
                    res.status(401).json({ 'status': 'failed', 'message': 'Mobile Number Already Registered' });
                } else {
                    const [dataSaved] = await pool.query('INSERT INTO users SET ?', {
                        name,
                        mobileNumber,
                        email,
                        password: hashPassword,
                    });
    
                    if (dataSaved.affectedRows > 0) {
                        res.status(201).json({ 'status': 'success', 'message': 'Registration Successful' });
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' });
                    }
                }
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

    static fetchDashboardData = async (req, res) => {
        try {
            
            const [totalRegistration] = await pool.query('SELECT * FROM students');
            const [totalCertificates] = await pool.query('SELECT * FROM certificates');
            const [totalCourses] = await pool.query('SELECT * FROM courses');
            const [totalPlacements] = await pool.query('SELECT * FROM placements');
    
            res.status(200).json({
                success: true,
                data: { totalRegistration, totalCertificates, totalCourses, totalPlacements }
            });
        } catch (err) {
            res.status(500).json({ status: 'failed', message: `Error: ${err.message}` });
        }
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (email && password) {
                const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

                if (user.length > 0) {
                    const isPasswordMatched = await bcrypt.compare(password, user[0].password);

                    if (isPasswordMatched) {
                        const token = jwt.sign({
                            id: user[0].user_id,
                            name: user[0].name,
                            email: user[0].email,
                            mobileNumber: user[0].mobileNumber,
                        },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '30 days' });

                        res.status(200).json({ 'status': 'success', 'message': 'Login Successfully', token });
                    } else {
                        res.status(401).json({ 'status': 'failed', 'message': 'Invalid Email or Password' });
                    }
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'User not Found' });
                }
            } else {
                res.status(400).json({ 'status': 'failed', 'message': 'All Fields are required' });
            }
        } catch (err) {
            res.status(500).json({ 'status': 'failed', 'message': `Error: ${err.message}` });
        }
    }

}

module.exports = UserController;