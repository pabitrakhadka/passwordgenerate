export default async function handler(req, res) {
  try {
    function generatePassword(length, capital, small, number, special) {
      let password = "";
      const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const smallLetters = "abcdefghijklmnopqrstuvwxyz";
      const numberLetters = "0123456789";
      const specialCharacters = "@$%^&*()";
      
      let characterSet = "";
      
      if (capital === "true") {
        characterSet += capitalLetters;
      }
      if (small === "true") {
        characterSet += smallLetters;
      }
      if (number === "true") {
        characterSet += numberLetters;
      }
      if (special === "true") {
        characterSet += specialCharacters;
      }
      
      if (characterSet.length === 0) {
        throw new Error("No character sets selected");
      }
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
      }
      
      return password;
    }

    function evaluatePasswordStrength(password) {
      const length = password.length;
      let strengthScore = 0;

      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /[0-9]/.test(password);
      const hasSpecial = /[@$%^&*()]/.test(password);

      // Assign points based on the presence of character types
      if (hasUpperCase) strengthScore += 1;
      if (hasLowerCase) strengthScore += 1;
      if (hasNumbers) strengthScore += 1;
      if (hasSpecial) strengthScore += 1;

      // Consider length for further scoring
      if (length >= 12) {
        strengthScore += 2;
      } else if (length >= 8) {
        strengthScore += 1;
      }

      // Determine password strength
      let passwordStrength;
      if (strengthScore <= 2) {
        passwordStrength = "very weak";
      } else if (strengthScore === 3) {
        passwordStrength = "weak";
      } else if (strengthScore === 4) {
        passwordStrength = "strong";
      } else {
        passwordStrength = "very strong";
      }

      return passwordStrength;
    }

    if (req.method === "GET") {
      const { length, capital, small, number, special } = req.query;

      const parsedLength = parseInt(length, 10);
      if (isNaN(parsedLength) || parsedLength <= 0) {
        return res.status(400).json({ error: "Invalid length parameter" });
      }

      const password = generatePassword(parsedLength, capital, small, number, special);
      const passwordStrength = evaluatePasswordStrength(password);

      res.status(200).json({ password: password, password_text: passwordStrength });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
}
