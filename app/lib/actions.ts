'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
 // zod: 데이터 validation을 위해 사용하는 라이브러리
 //formData 로 넘어오는 데이터는 string 이라서 string을 숫자로 바꿔줌
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number()   // coerce (change) from a string to a number
                    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }), 
  date: z.string(),
});
 // .omit()안의 데이터를 생력한 스키마를 새로 만들어줌
 //스키마(Schema)는 데이터의 구조와 제약 조건을 정의하는 것을 말합니다
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
//export async function createInvoice(formData: FormData) {
  export async function createInvoice(prevState: State, formData: FormData) {
  //const { customerId, amount, status } = CreateInvoice.parse({
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try { //  to handle errors "gracefully"

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices'); // ()경로의 캐시 데이터를 삭제함 (새로운 리퀘스트 받기 위한것)
  redirect('/dashboard/invoices'); // ()의 경로로 재연결

}
// export async function createInvoice(formData: FormData) {
//   const rawFormData = {
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   };
//   // Test it out:
//   console.log(rawFormData);
//   console.log(typeof rawFormData.amount);
// }

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}