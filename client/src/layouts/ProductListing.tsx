import { AppSidebar } from "@/components/app-sidebar"
import ProductCard from "@/components/ProductCard1"
import { product } from "@/dummyData/Products"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { useParams } from "react-router-dom";


const ProductListing = () => {
    const { productString } = useParams();

    console.log(productString);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 bg-background px-4"> {/* add class border-b  for border */}
                    <SidebarTrigger className="-ml-1" />
                    {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage> Men </BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage> Tshirts </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <ProductCard
                                name={product.name}
                                price={product.price}
                                image="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1736596237_9421843.jpg?format=webp&w=480&dpr=2.0"
                                brand="Souled Store"
                                key={i} className="rounded-xl bg-muted/50" />
                            //   <div key={i} className="aspect-square rounded-xl bg-muted/50" />
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ProductListing