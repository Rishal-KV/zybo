
import NavBar from "@/components/common/navBar";
import Footer from "@/components/common/footer";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
};

export default ShopLayout;
