import 'package:bartr/onboarding/onboarding_slides_screen.dart';
import 'package:bartr/widget/custom_button.dart';
import 'package:flutter/material.dart';

class IndexFile extends StatelessWidget {
  const IndexFile({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Header Text
              const Text(
                "Trade Without Money",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 28,
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 16),

              // Subtitle
              const Text(
                "Exchange goods and services directly with others.\nNo cash needed — only value for value.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 15,
                  color: Colors.black,
                  height: 1.4,
                ),
              ),

              const SizedBox(height: 40),

              // Stats Row
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildStat("10K+", "Active Users"),
                  const SizedBox(width: 32),
                  _buildStat("25K+", "Trades Done"),
                  const SizedBox(width: 32),
                  _buildStat("4.8★", "App Rating"),
                ],
              ),

              const SizedBox(height: 60),

              // Button
              SizedBox(
                width: 200,
                child: CustomButton(
                  text: "Get Started",
                  icon: Icons.arrow_forward_ios,
                  color: Colors.black,
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => const OnboardingSlidesScreen(),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Stats widget
  static Widget _buildStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.black,
            fontSize: 18,
          ),
        ),
        const SizedBox(height: 4),
        Text(label, textAlign: TextAlign.center),
      ],
    );
  }
}
