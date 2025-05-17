import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from '@/payload-types';

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { CustomCategory } from './types';

interface Props {
    children: React.ReactNode
};


const Layout = async ({children}: Props) => {

    const playload = await getPayload({
        config: configPromise,
    })

    const data = await playload.find({
        collection: "categories",
        depth:1,      //Populate subcategories, subcategory[0] will be a type of "category"
        pagination:false,
        where: {
            parent : {
                exists: false,
            },
        },
        sort:"name"
    });

    const formattedData : CustomCategory[]= data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            // because Of "depth 1" doc will be a type od "Category"
        subcategories: undefined,
        }))
    }));


    return (
        <div className=" flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data ={formattedData}/>
            <div className="flex-1 bg-[#F4F4F0]">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;