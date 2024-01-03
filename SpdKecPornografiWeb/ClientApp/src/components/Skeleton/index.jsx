import { Skeleton } from 'react-skeleton-generator';

const SkeletonComponent = () => {
    return(
        <Skeleton.SkeletonThemeProvider style={{display: "flex", flexDirection: "column", gap: "2%"}}>
            <Skeleton width={"100%"}  height={"50px"} style={{margin: "1%"}} />
            <Skeleton.SkeletonThemeProvider style={{display: "flex", justifyContent: "space-between"}} >
                <Skeleton.SkeletonThemeProvider style={{width: "15%", marginTop: "1%", marginLeft: "0.5%"}}>
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <Skeleton count={3} widthMultiple={['100%', '50%', '75%']} heightMultiple={['50px', '20px', '15px']} />
                    <Skeleton count={3} widthMultiple={['100%', '50%', '75%']} heightMultiple={['50px', '20px', '15px']} />
                    <Skeleton count={3} widthMultiple={['100%', '50%', '75%']} heightMultiple={['50px', '20px', '15px']} />
        
                    <Skeleton count={3} widthMultiple={['100%', '50%', '75%']} heightMultiple={['50px', '20px', '15px']} />
                    <Skeleton count={3} widthMultiple={['100%', '50%', '75%']} heightMultiple={['50px', '20px', '15px']} />
                </Skeleton.SkeletonThemeProvider>
    
                <Skeleton.SkeletonThemeProvider style={{width: "80%", marginTop: "5%", marginLeft: "0.5%", paddingRight: "1%"}}>
                    <Skeleton count={3} widthMultiple={['100%', '100%', '100%']} heightMultiple={['50px', '20px', '15px']} />
                </Skeleton.SkeletonThemeProvider>
            </Skeleton.SkeletonThemeProvider>
        </Skeleton.SkeletonThemeProvider>
    )
}
export default SkeletonComponent;