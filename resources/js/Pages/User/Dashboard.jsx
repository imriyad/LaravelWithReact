import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function UserDashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user} header={<h2>User Dashboard</h2>}>
            <Head title="User Dashboard" />
            <div className="p-6">Welcome, User!</div>
        </AuthenticatedLayout>
    );
}
