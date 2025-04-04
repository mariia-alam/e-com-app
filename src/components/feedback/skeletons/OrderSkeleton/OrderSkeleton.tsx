import ContentLoader from "react-content-loader";

const OrderSkeleton = () => (
  <ContentLoader
    speed={2}
    style={{ marginTop:"-12vw"}}
    width="100%"
    viewBox="20 0 400 300"
    backgroundColor="#f0f0f0"
    foregroundColor="#ffffff"
  >
<rect x="47" y="61" rx="0" ry="0" width="58" height="12" />
<rect x="150" y="61" rx="0" ry="0" width="136" height="12" />
<rect x="326" y="61" rx="0" ry="0" width="58" height="12" />

<rect x="47" y="85" rx="0" ry="0" width="58" height="12" />
<rect x="150" y="85" rx="0" ry="0" width="136" height="12" />
<rect x="327" y="85" rx="0" ry="0" width="58" height="12" />

<rect x="47" y="109" rx="0" ry="0" width="58" height="12" />
<rect x="150" y="109" rx="0" ry="0" width="136" height="12" />
<rect x="326" y="109" rx="0" ry="0" width="58" height="12" />

<rect x="47" y="133" rx="0" ry="0" width="58" height="12" />
<rect x="150" y="133" rx="0" ry="0" width="136" height="12" />
<rect x="326" y="133" rx="0" ry="0" width="58" height="12" />

<rect x="47" y="157" rx="0" ry="0" width="58" height="12" />
<rect x="150" y="157" rx="0" ry="0" width="136" height="12" />
<rect x="326" y="157" rx="0" ry="0" width="58" height="12" />

<rect x="47" y="181" rx="0" ry="0" width="58" height="12" />
<rect x="150" y="181" rx="0" ry="0" width="136" height="12" />
<rect x="326" y="181" rx="0" ry="0" width="58" height="12" />

  </ContentLoader>
);

export default OrderSkeleton;