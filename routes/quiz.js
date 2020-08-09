const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const QuizQuestion = require("../models/QuizObject");
const auth = require("../middleware/auth");
/**
 * @method - POST
 * @param - /register
 * @description - User Registration
 */
router.post("/add_quiz_question",auth,
    [
        check("question", "Please enter a valid question").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            question,
            options,
            rightAnswer,
            additionalAnswerInfo
        } = req.body;
        try {

            const questionObject = new QuizQuestion({
                question,
                options,
                rightAnswer,
                additionalAnswerInfo
            });

            if(req.body.additionalInfoImage) {
                questionObject.additionalInfoImage = req.body.additionalInfoImage
            }

            // questionObject.save(function (err, quiz) {
            //     if (err) return console.error(err);
            //     console.log(quiz + " saved to bookstore collection.");
            //   });
            res.status(200).json({
                "response": "success"
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */
router.get("/get_quiz_questions", async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const questions = await QuizQuestion.find({});
      res.json(questions);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
});

module.exports = router;