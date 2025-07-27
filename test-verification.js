// Test script to demonstrate the email verification system
// This will show how the system handles invalid email addresses

const { sendContactEmail } = require("./src/actions/contact.ts");

async function testEmailVerification() {
  console.log("🧪 Testing Email Verification System\n");

  // Test cases with different email scenarios
  const testCases = [
    {
      name: "Valid Email Test",
      data: {
        name: "John Doe",
        email: "test@gmail.com", // This might work
        subject: "Test with valid email",
        message:
          "This is a test message with a potentially valid email address.",
      },
    },
    {
      name: "Invalid Email Test",
      data: {
        name: "Jane Smith",
        email: "invalid-email@nonexistentdomain999.com", // This will likely fail
        subject: "Test with invalid email",
        message: "This is a test message with an invalid email address.",
      },
    },
    {
      name: "Temporary Email Test",
      data: {
        name: "Bob Wilson",
        email: "test@10minutemail.com", // Temporary email service
        subject: "Test with temporary email",
        message: "This is a test message with a temporary email address.",
      },
    },
  ];

  for (const testCase of testCases) {
    console.log(`🔍 Running: ${testCase.name}`);
    console.log(`📧 Email: ${testCase.data.email}\n`);

    try {
      const result = await sendContactEmail(testCase.data);

      if (result.success) {
        console.log("✅ Result:", result.message);

        if (result.message.includes("delivery failed")) {
          console.log(
            "⚠️  This should trigger a warning email to you about the invalid address"
          );
        } else {
          console.log("✅ Confirmation email was delivered successfully");
        }
      } else {
        console.log("❌ Failed:", result.message);
      }
    } catch (error) {
      console.log("❌ Error:", error.message);
    }

    console.log("\n" + "=".repeat(50) + "\n");
  }

  console.log("🎯 How the verification system works:");
  console.log("1. Your notification email is sent first (this always works)");
  console.log("2. System tries to send confirmation email to the sender");
  console.log(
    "3. If confirmation fails → You get a warning email about potentially invalid address"
  );
  console.log("4. If confirmation succeeds → Both parties are notified");
  console.log("\n📬 Check your email (rabinkarmakar947@gmail.com) for:");
  console.log("- Contact form notifications");
  console.log("- Warning emails about failed confirmations");
}

// Run the test
testEmailVerification().catch(console.error);
