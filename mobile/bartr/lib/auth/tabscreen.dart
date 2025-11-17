import 'package:flutter/material.dart';
import 'package:bartr/auth/signin_screen.dart';
import 'package:bartr/auth/signup_screen.dart';

class AuthTabScreen extends StatefulWidget {
  const AuthTabScreen({super.key});

  @override
  State<AuthTabScreen> createState() => _AuthTabScreenState();
}

class _AuthTabScreenState extends State<AuthTabScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() {
      setState(() {});
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final primaryColor = Theme.of(context).primaryColor;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Header Section
            Padding(
              padding: const EdgeInsets.only(
                top: 20,
                bottom: 32,
                left: 24,
                right: 24,
              ),
            ),

            // Modern Segmented Tab Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 14),
              child: Container(
                decoration: BoxDecoration(
                  color: isDark ? Colors.grey[900] : Colors.grey[100],
                  borderRadius: BorderRadius.circular(16),
                ),
                child: TabBar(
                  controller: _tabController,
                  indicator: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 10,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  labelColor: Colors.black87,
                  unselectedLabelColor: isDark
                      ? Colors.grey[400]
                      : Colors.grey[600],
                  labelStyle: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.2,
                  ),
                  unselectedLabelStyle: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    letterSpacing: 0.2,
                  ),
                  dividerColor: Colors.transparent,
                  padding: const EdgeInsets.all(6),
                  tabs: [
                    Tab(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 44,
                          vertical: 10,
                        ),
                        child: Text('Sign In'),
                      ),
                    ),
                    Tab(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 44,
                          vertical: 10,
                        ),
                        child: Text('Sign Up'),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Tab Content with Smooth Transition
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: const [SigninScreen(), SignupScreen()],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
