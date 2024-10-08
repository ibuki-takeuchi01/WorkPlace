import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額は1円以上必須です" }),
  content: z.string().min(1, { message: "内容を入力してください" }),

  category: z.union([
    z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費", "医療費"]),
    z.enum(["給与", "ボーナス", "その他収入"]),
    z.literal(""),
  ])
    .refine((val) => val !== "", {
      message: "カテゴリを選択してください"
    }).or(z.literal(""))
});

export type Schema = z.infer<typeof transactionSchema>