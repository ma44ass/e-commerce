import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view";

interface PageProps {
    params: Promise<{slug: string}>
}

const Page =  async({params}: PageProps) => {
    const {slug} = await params;
    return(
        <CheckoutView  tenantSlug={slug}/>

        //http://localhost/3000/tenants/assma/checkout
    );
}

export default Page;