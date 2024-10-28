# Ideagen_test Criteria

## User Story
As a **user** responsible for managing sales orders, I want **a user interface to add, view, update, and categorize sales orders**, so that **I can efficiently track and manage customer orders by category and status.**

## Acceptance Criteria
1. **Create New User**: 
   - System allows creation of a user with specific access.
   
2. **Create and Manage Product Categories**: 
   - The product categories table should include:
     - `object_id`, `name`, `is_active` (status), `created_date`, and `updated_date`.
   - Users can add, view, and edit categories.
   
3. **Manage Sales Orders**:
   - Sales orders should contain:
     - `object_id`, `customer_name`, `status`, `category_id` (linked to product category), `country`, `created_date`, and `updated_date`.
   - Users can add, view, update, and delete sales orders.
   - Orders link to existing categories by `category_id`.
   
4. **View Data**:
   - Users can view existing categories and sales orders with details like status, category, and associated customer.
