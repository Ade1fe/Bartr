import 'package:bartr/theme/theme.dart';
import 'package:flutter/material.dart';

class SwapHomePage extends StatelessWidget {
  const SwapHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context); // get current theme
    // final textTheme = theme.textTheme;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 🔍 Search + Categories + Location + Filter
              _buildTopFilters(theme),

              const SizedBox(height: 20),

              // ⭐ Smart Match Tabs
              _buildTabs(theme),

              const SizedBox(height: 20),

              // 🧩 Items Grid
              _buildItemsGrid(theme),
            ],
          ),
        ),
      ),
    );
  }

  // 🔍 TOP FILTER BAR
  Widget _buildTopFilters(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Search Bar
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14),
          decoration: BoxDecoration(
            color: theme.inputDecorationTheme.fillColor,
            borderRadius: BorderRadius.circular(AppTheme.radius),
            border: Border.all(color: Colors.grey.shade300),
          ),
          child: Row(
            children: [
              Icon(Icons.search, color: Colors.grey),
              const SizedBox(width: 10),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    hintText: "Search for goods or services...",
                    border: InputBorder.none,
                  ),
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 14),

        // Category + Location + Filter Icon
        Row(
          children: [
            _buildDropdown("All Categories", theme),
            const SizedBox(width: 10),
            _buildDropdown("Nearby", theme),
            const SizedBox(width: 10),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(AppTheme.radius),
                border: Border.all(color: Colors.grey.shade300),
                color: theme.inputDecorationTheme.fillColor,
              ),
              child: Icon(
                Icons.filter_list,
                size: 22,
                color: theme.colorScheme.primary,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDropdown(String title, ThemeData theme) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(AppTheme.radius),
          border: Border.all(color: Colors.grey.shade300),
          color: theme.inputDecorationTheme.fillColor,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: const TextStyle(fontSize: 14)),
            Icon(
              Icons.keyboard_arrow_down_rounded,
              color: theme.colorScheme.primary,
            ),
          ],
        ),
      ),
    );
  }

  // 🔖 Tabs
  Widget _buildTabs(ThemeData theme) {
    return Row(
      children: [
        _tabButton("Browse All", theme, isActive: true),
        const SizedBox(width: 8),
        _tabButton("Smart Matches", theme, count: 12),
        const SizedBox(width: 8),
        _tabButton("Saved", theme),
      ],
    );
  }

  Widget _tabButton(
    String text,
    ThemeData theme, {
    bool isActive = false,
    int? count,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: isActive
            ? theme.colorScheme.primary
            : theme.scaffoldBackgroundColor,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Row(
        children: [
          Text(
            text,
            style: TextStyle(
              color: isActive
                  ? Colors.white
                  : theme.textTheme.bodyMedium!.color,
              fontWeight: FontWeight.w500,
            ),
          ),
          if (count != null) ...[
            const SizedBox(width: 6),
            Text(
              "$count",
              style: TextStyle(
                color: isActive
                    ? Colors.white
                    : theme.textTheme.bodyMedium!.color,
              ),
            ),
          ],
        ],
      ),
    );
  }

  // 🛒 ITEMS GRID
  Widget _buildItemsGrid(ThemeData theme) {
    return GridView.builder(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemCount: 6,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.74,
        crossAxisSpacing: 14,
        mainAxisSpacing: 14,
      ),
      itemBuilder: (context, index) => _swapItemCard(theme),
    );
  }

  // ⭐ SWAP ITEM CARD
  Widget _swapItemCard(ThemeData theme) {
    return Container(
      decoration: BoxDecoration(
        color: theme.inputDecorationTheme.fillColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black12.withOpacity(0.04),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Item Image
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: Image.network(
              "https://i.imgur.com/QCNbOAo.jpeg",
              height: 130,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 10),
          // User Info
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 18,
                  backgroundImage: NetworkImage(
                    "https://i.imgur.com/BoN9kdC.png",
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Sarah John",
                        style: theme.textTheme.bodyMedium!.copyWith(
                          fontWeight: FontWeight.w600,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          const Icon(
                            Icons.location_on,
                            size: 13,
                            color: Colors.grey,
                          ),
                          const SizedBox(width: 2),
                          Text(
                            "Abuja, Nigeria",
                            style: theme.textTheme.bodySmall!.copyWith(
                              fontSize: 11,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          // Reviews
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              children: List.generate(
                5,
                (index) =>
                    const Icon(Icons.star, size: 15, color: Colors.amber),
              ),
            ),
          ),
          const SizedBox(height: 10),
        ],
      ),
    );
  }
}
