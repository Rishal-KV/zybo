
import NavBar from "@/components/common/navBar";
import Footer from "@/components/common/footer";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {


    return (
        <>
            <NavBar />
            <div className="pt-20">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default ShopLayout;
