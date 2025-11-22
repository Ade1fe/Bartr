import 'package:bartr/auth/tabscreen.dart';
import 'package:bartr/widget/custom_button.dart';
import 'package:flutter/material.dart';

class OnboardingSlidesScreen extends StatefulWidget {
  const OnboardingSlidesScreen({super.key});

  @override
  State<OnboardingSlidesScreen> createState() => _OnboardingSlidesScreenState();
}

class _OnboardingSlidesScreenState extends State<OnboardingSlidesScreen> {
  final PageController _controller = PageController();
  int _currentIndex = 0;

  final List<Map<String, String>> onboardingData = [
    {
      "image": "assets/login.png",
      "title": "Create Your Profile",
      "subtitle":
          "Sign up and verify your account.\nAdd what you offer and what you're looking for.",
    },
    {
      "image": "assets/swipe.png",
      "title": "Find Matches",
      "subtitle":
          "Our smart algorithm finds users who want what you offer and offer what you want.",
    },
    {
      "image": "assets/swipe2.png",
      "title": "Swap & Confirm",
      "subtitle":
          "Chat with other users, agree on terms, and complete your trade securely.",
    },
    {
      "image": "assets/trust.png",
      "title": "Build Trust",
      "subtitle":
          "Rate trades, build reputation, and become a trusted member of the community.",
    },
  ];

  void _finishOnboarding() {
    // TODO: Navigate to Login/Signup screen
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => AuthTabScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Skip button
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () =>
                    _controller.jumpToPage(onboardingData.length - 1),
                child: const Text(
                  "Skip",
                  style: TextStyle(color: Colors.black),
                ),
              ),
            ),
            const SizedBox(height: 10),

            // Slider View
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: onboardingData.length,
                onPageChanged: (index) => setState(() => _currentIndex = index),
                itemBuilder: (_, index) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Onboarding image
                        SizedBox(
                          height: 260,
                          child: Image.asset(
                            onboardingData[index]['image']!,
                            fit: BoxFit.contain,
                          ),
                        ),
                        const SizedBox(height: 40),

                        // Title
                        Text(
                          onboardingData[index]['title']!,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 24,
                            color: Colors.black,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 12),

                        // Subtitle
                        Text(
                          onboardingData[index]['subtitle']!,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 15,
                            color: Colors.black,
                            height: 1.4,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 20),

            // Indicators
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                onboardingData.length,
                (index) => AnimatedContainer(
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  height: 9,
                  width: _currentIndex == index ? 26 : 10,
                  duration: const Duration(milliseconds: 300),
                  decoration: BoxDecoration(
                    color: _currentIndex == index
                        ? Theme.of(context).primaryColor
                        : Colors.grey.shade400,
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 25),

            // Final button only on last slide
            if (_currentIndex == onboardingData.length - 1)
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 14,
                ),
                child: CustomButton(
                  text: "Get Started",
                  onPressed: _finishOnboarding,
                  color: Colors.black,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
