
# Supabase RLS Policies Guide

This document explains the Row Level Security (RLS) policies applied to our database.

## What is RLS?

Row Level Security (RLS) is a PostgreSQL security feature that restricts which rows users can access in a database table. It's essential for multi-tenant applications to ensure users only access their own data.

## Our RLS Policies

### Profiles Table
- Users can only view, update, and insert their own profile
- User ID must match the authenticated user's ID

### Orders Table
- Users can only view their own orders
- Users can only create orders for themselves
- Users can only update their own orders in 'draft' status

### Order Items Table
- Users can only view order items for orders they own
- Users can only add items to orders they own

### Products Table
- Anyone can view products (public read access)
- Only admins can modify products (handled separately)

### Categories Table
- Anyone can view categories (public read access)
- Only admins can modify categories (handled separately)

### Addresses Table
- Users can only view, insert, update their own addresses
- Users can only delete their non-default addresses

## How to Apply These Policies

Run the SQL commands from `src/lib/rls-policies.sql` in your Supabase SQL Editor to apply these policies.

## Admin Access

These policies don't include admin access. For admin functionality, you would typically:
1. Create a separate admin schema and functions
2. Use service roles with proper authentication
3. Build admin-specific API endpoints with appropriate authorization
