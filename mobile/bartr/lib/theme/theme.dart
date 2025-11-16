// theme.dart

import 'package:flutter/material.dart';

class AppTheme {
  // Brand Colors
  static const Color primaryColor = Color(0xFF556B2F); //  1F453D   0xFFA5B6B1
  static const Color secondaryColor = Colors.black;
  static const Color scaffoldDark = Color(0xFF0F0F0F);
  static const Color scaffoldLight = Color(0xFFFDFDFD);
  // ---------------- GREEN COLOR PALETTE ----------------

  // Light to Dark Scale
  static const Color green50 = Color(
    0xFFE8F8EE,
  ); // very light green / backgrounds
  static const Color green100 = Color(0xFFD1F2DE); // soft tint / containers
  static const Color green200 = Color(0xFFA5E6B1); // your primary shade
  static const Color green300 = Color(0xFF7AD985); // soft accent
  static const Color green400 = Color(0xFF54CC61); // accent / icons
  static const Color green500 = Color(0xFF2EBF3D); // standard green / buttons
  static const Color green600 = Color(0xFF19992D); // stronger CTA
  static const Color green700 = Color(
    0xFF0F6F21,
  ); // dark accent / focused border
  static const Color green800 = Color(0xFF064716); // dark backgrounds
  static const Color green900 = Color(0xFF012A0C); // deepest / extra contrast

  // Neutral Greens (muted modern tones)
  static const Color oliveGreen = Color(0xFF556B2F);
  static const Color forestGreen = Color(0xFF228B22);
  static const Color emeraldGreen = Color(0xFF50C878);
  static const Color tealGreen = Color(0xFF008080);
  static const Color pastelGreen = Color(0xFF77DD77);
  static const Color sageGreen = Color(0xFF9DC183);
  static const Color mintGreen = Color(0xFF98FF98);
  static const Color mossGreen = Color(0xFF8A9A5B);
  static const Color seaGreen = Color(0xFF2E8B57);
  static const Color jadeGreen = Color(0xFF00A86B);

  // Optional Transparent Versions
  static const Color greenTransparentLight = Color(0x3354CC61);
  static const Color greenTransparentDark = Color(0x8819992D);

  // Global Border Radius
  static const double radius = 12;

  // ------------ LIGHT THEME -------------
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    scaffoldBackgroundColor: scaffoldLight,
    primaryColor: primaryColor,
    colorScheme: ColorScheme.light(
      primary: primaryColor,
      secondary: secondaryColor,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: scaffoldLight,
      elevation: 0,
      iconTheme: IconThemeData(color: Colors.black),
      titleTextStyle: TextStyle(
        color: Colors.black,
        fontWeight: FontWeight.w600,
        fontSize: 18,
      ),
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(color: Colors.black),
      bodyMedium: TextStyle(color: Colors.black87),
      titleLarge: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(radius),
        borderSide: BorderSide(color: primaryColor),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(radius),
        borderSide: BorderSide(color: primaryColor, width: 1.6),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radius),
        ),
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
      ),
    ),
  );

  // ------------ DARK THEME -------------
  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: scaffoldDark,
    primaryColor: primaryColor,
    colorScheme: ColorScheme.dark(
      primary: primaryColor,
      secondary: Colors.white,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: scaffoldDark,
      elevation: 0,
      iconTheme: IconThemeData(color: Colors.white),
      titleTextStyle: TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.w600,
        fontSize: 18,
      ),
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(color: Colors.white),
      bodyMedium: TextStyle(color: Colors.white70),
      titleLarge: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Color(0xFF1A1A1A),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(radius),
        borderSide: BorderSide(color: primaryColor),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(radius),
        borderSide: BorderSide(color: primaryColor, width: 1.6),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radius),
        ),
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
      ),
    ),
  );
}
