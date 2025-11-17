// import 'package:bartr/theme/theme.dart';
// import 'package:flutter/material.dart';

// class CustomButton extends StatelessWidget {
//   final String text;
//   final VoidCallback onPressed;
//   final bool isLoading;
//   final Color? color;
//   final Color? textColor;
//   final double radius;
//   final IconData? icon;
//   final double fontSize;
//   final FontWeight fontWeight;
//   final EdgeInsetsGeometry padding;

//   const CustomButton({
//     super.key,
//     required this.text,
//     required this.onPressed,
//     this.isLoading = false,
//     this.color,
//     this.textColor,
//     this.radius = AppTheme.radius,
//     this.icon,
//     this.fontSize = 15,
//     this.fontWeight = FontWeight.w600,
//     this.padding = const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
//   });

//   @override
//   Widget build(BuildContext context) {
//     final theme = Theme.of(context);

//     return SizedBox(
//       width: double.infinity,
//       child: ElevatedButton(
//         onPressed: isLoading ? null : onPressed,
//         style: ElevatedButton.styleFrom(
//           backgroundColor: color ?? theme.primaryColor,
//           foregroundColor: textColor ?? Colors.white,
//           padding: padding,
//           shape: RoundedRectangleBorder(
//             borderRadius: BorderRadius.circular(radius),
//           ),
//         ),
//         child: isLoading
//             ? const SizedBox(
//                 height: 22,
//                 width: 22,
//                 child: CircularProgressIndicator(
//                   strokeWidth: 2,
//                   valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
//                 ),
//               )
//             : Row(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: [
//                   if (icon != null) ...[
//                     Icon(icon, size: 18),
//                     const SizedBox(width: 8),
//                   ],
//                   Text(
//                     text,
//                     style: TextStyle(
//                       fontSize: fontSize,
//                       fontWeight: fontWeight,
//                     ),
//                   ),
//                 ],
//               ),
//       ),
//     );
//   }
// }
import 'package:bartr/theme/theme.dart';
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final Color? color;
  final Color? textColor;
  final double radius;
  final IconData? icon;
  final double fontSize;
  final FontWeight fontWeight;
  final EdgeInsetsGeometry padding;

  const CustomButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.color,
    this.textColor,
    this.radius = AppTheme.radius,
    this.icon,
    this.fontSize = 15,
    this.fontWeight = FontWeight.w600,
    this.padding = const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: color ?? theme.primaryColor,
          foregroundColor: textColor ?? Colors.white,
          padding: padding,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(radius),
          ),
        ),
        child: isLoading
            ? const SizedBox(
                height: 22,
                width: 22,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (icon != null) ...[
                    Icon(icon, size: 18),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    text,
                    style: TextStyle(
                      fontSize: fontSize,
                      fontWeight: fontWeight,
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
