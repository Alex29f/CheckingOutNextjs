import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    console.log('Props received:', props);
    const params = await props.params;
    console.log('Params after await:', params);
    const id = params.id;
    console.log('ID:', id);
    
    try {
        const [invoice, customers] = await Promise.all([
            fetchInvoiceById(id),
            fetchCustomers(),
        ]);
        if (!invoice){
            notFound();
        }
        console.log('Invoice:', invoice);
        console.log('Customers:', customers);
        
        return (
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Invoices', href: '/dashboard/invoices' },
                        {
                            label: 'Edit Invoice',
                            href: `/dashboard/invoices/${id}/edit`,
                            active: true,
                        },
                    ]}
                />
                <Form invoice={invoice} customers={customers} />
            </main>
        );
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}