export interface PolicyProps {
  privacyPolicy: string;
  cookiePolicy: string;
}

export default function Policy(props: PolicyProps) {
  const { privacyPolicy, cookiePolicy } = props;

  return (
    <div class="justify-left flex gap-3 text-sm">
      <a hreflang="en-US" href={privacyPolicy}>
        Privacy policy
      </a>
      <a hreflang="en-US" href={cookiePolicy}>
        Cookie policy
      </a>
    </div>
  );
}
