import 'package:flutter/material.dart';

class SwapHomePage extends StatelessWidget {
  const SwapHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xfff7f8fa),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 🔍 Search + Categories + Location + Filter
              _buildTopFilters(),

              const SizedBox(height: 20),

              // ⭐ Smart Match Tabs
              _buildTabs(),

              const SizedBox(height: 20),

              // 🧩 Items Grid
              _buildItemsGrid(),
            ],
          ),
        ),
      ),
    );
  }

  // -------------------------------------------
  // 🔍 TOP FILTER BAR (Search + Category + Location + Filter Icon)
  // -------------------------------------------
  Widget _buildTopFilters() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Search Bar
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.grey.shade300),
          ),
          child: Row(
            children: [
              const Icon(Icons.search, color: Colors.grey),
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
            // Category Dropdown
            _buildDropdown("All Categories"),

            const SizedBox(width: 10),

            // Location Dropdown
            _buildDropdown("Nearby"),

            const SizedBox(width: 10),

            // Filter Icon
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
                color: Colors.white,
              ),
              child: const Icon(Icons.filter_list, size: 22),
            ),
          ],
        ),
      ],
    );
  }

  // -------------------------------------------
  // 📌 DROPDOWN BOX
  // -------------------------------------------
  Widget _buildDropdown(String title) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey.shade300),
          color: Colors.white,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: const TextStyle(fontSize: 14)),
            const Icon(Icons.keyboard_arrow_down_rounded),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------
  // 🔖 Tabs (Browse All - Smart Matches - Saved)
  // -------------------------------------------
  Widget _buildTabs() {
    return Row(
      children: [
        _tabButton("Browse All", isActive: true),
        const SizedBox(width: 8),
        _tabButton("Smart Matches", count: 12),
        const SizedBox(width: 8),
        _tabButton("Saved"),
      ],
    );
  }

  Widget _tabButton(String text, {bool isActive = false, int? count}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: isActive ? Colors.black : Colors.white,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Row(
        children: [
          Text(
            text,
            style: TextStyle(
              color: isActive ? Colors.white : Colors.black,
              fontWeight: FontWeight.w500,
            ),
          ),
          if (count != null) ...[
            const SizedBox(width: 6),
            Text(
              "$count",
              style: TextStyle(color: isActive ? Colors.white : Colors.black),
            ),
          ],
        ],
      ),
    );
  }

  // -------------------------------------------
  // 🛒 ITEMS GRID (with user, location & reviews)
  // -------------------------------------------
  Widget _buildItemsGrid() {
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
      itemBuilder: (context, index) {
        return _swapItemCard();
      },
    );
  }

  // -------------------------------------------
  // ⭐ SWAP ITEM CARD (with user info)
  // -------------------------------------------
  Widget _swapItemCard() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
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
                CircleAvatar(
                  radius: 18,
                  backgroundImage: NetworkImage(
                    "https://i.imgur.com/BoN9kdC.png",
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        "Sarah John",
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(height: 2),
                      Row(
                        children: [
                          Icon(Icons.location_on, size: 13, color: Colors.grey),
                          SizedBox(width: 2),
                          Text(
                            "Abuja, Nigeria",
                            style: TextStyle(fontSize: 11, color: Colors.grey),
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
