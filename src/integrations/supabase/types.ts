export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banhos: {
        Row: {
          created_at: string
          id: number
          imagem: string | null
          subtitulo: string
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          imagem?: string | null
          subtitulo: string
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          imagem?: string | null
          subtitulo?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      banhos_ervas: {
        Row: {
          banho_id: number
          created_at: string
          erva_id: number
          updated_at: string
        }
        Insert: {
          banho_id: number
          created_at?: string
          erva_id: number
          updated_at?: string
        }
        Update: {
          banho_id?: number
          created_at?: string
          erva_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "banhos_ervas_banho_id_fkey"
            columns: ["banho_id"]
            isOneToOne: false
            referencedRelation: "banhos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banhos_ervas_erva_id_fkey"
            columns: ["erva_id"]
            isOneToOne: false
            referencedRelation: "ervas"
            referencedColumns: ["id"]
          },
        ]
      }
      ervas: {
        Row: {
          created_at: string
          id: number
          imagem: string | null
          subtitulo: string
          texto: string
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          imagem?: string | null
          subtitulo: string
          texto: string
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          imagem?: string | null
          subtitulo?: string
          texto?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      frentes: {
        Row: {
          created_at: string
          descricao: string
          id: number
          imagem: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao: string
          id?: number
          imagem?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string
          id?: number
          imagem?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      perfis_filhos: {
        Row: {
          batizado: string
          created_at: string
          id: number
          imagem: string | null
          nascimento: string
          nome: string
          orixa: string
          updated_at: string
        }
        Insert: {
          batizado: string
          created_at?: string
          id?: number
          imagem?: string | null
          nascimento: string
          nome: string
          orixa: string
          updated_at?: string
        }
        Update: {
          batizado?: string
          created_at?: string
          id?: number
          imagem?: string | null
          nascimento?: string
          nome?: string
          orixa?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      sobre: {
        Row: {
          created_at: string
          id: number
          imagem: string | null
          texto: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          imagem?: string | null
          texto: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          imagem?: string | null
          texto?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
