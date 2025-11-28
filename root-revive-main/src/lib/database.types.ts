
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string
          created_at: string
          updated_at: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email: string
          created_at?: string
          updated_at?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string
          created_at?: string
          updated_at?: string | null
          avatar_url?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: string
          total: number
          created_at: string
          updated_at: string | null
          shipping_address: Json | null
          billing_address: Json | null
          payment_intent_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status: string
          total: number
          created_at?: string
          updated_at?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_intent_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          total?: number
          created_at?: string
          updated_at?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_intent_id?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: number
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: number
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: number
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          sale_price: number | null
          category: string
          image_url: string | null
          rating: number | null
          review_count: number | null
          on_sale: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          sale_price?: number | null
          category: string
          image_url?: string | null
          rating?: number | null
          review_count?: number | null
          on_sale?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          sale_price?: number | null
          category?: string
          image_url?: string | null
          rating?: number | null
          review_count?: number | null
          on_sale?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          image_url?: string | null
          created_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          address_line1: string
          address_line2: string | null
          city: string
          state: string
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          address_line1: string
          address_line2?: string | null
          city: string
          state: string
          postal_code: string
          country: string
          is_default?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          state?: string
          postal_code?: string
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
    }
  }
}
