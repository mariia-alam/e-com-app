import ContentLoader from "react-content-loader"
export default function CartSkeleton() {
    const renderSkeletons = Array(3).fill(0);
    return (
        <div>
        {renderSkeletons.map((_,idx)=>{
        return (
            <div style={{"width":"100%"}} key={idx}>
                <ContentLoader
                    speed={1}
                    width={1092}
                    height={191}
                    viewBox="0 0 1092 191"
                    backgroundColor="#e6e6e6"
                    foregroundColor="#fcfcfc"
                >
                    <rect x="13" y="221" rx="0" ry="0" width="50" height="8" /> 
                    <rect x="13" y="238" rx="0" ry="0" width="32" height="8" /> 
                    <rect x="13" y="254" rx="0" ry="0" width="23" height="7" /> 
                    <rect x="9" y="8" rx="2" ry="2" width="120" height="180" /> 
                    <rect x="159" y="21" rx="2" ry="2" width="210" height="20" /> 
                    <rect x="161" y="63" rx="2" ry="2" width="143" height="20" /> 
                    <rect x="160" y="106" rx="2" ry="2" width="106" height="20" /> 
                    <rect x="161" y="140" rx="2" ry="2" width="50" height="20" /> 
                </ContentLoader>
            </div>
        );
        })}
        </div>
    )
}
