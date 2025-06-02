export interface PolicyProps {
  privacyPolicy: string;
  privacyLabel: string;
  cookiePolicy: string;
  cookieLabel: string;
}

export default function Policy(props: PolicyProps) {
  const { privacyPolicy, privacyLabel, cookiePolicy, cookieLabel } = props;

  return (
    <div class="justify-left flex gap-3 text-sm">
      <a hreflang="en-US" href={privacyPolicy}>
        {privacyLabel}
      </a>
      <a hreflang="en-US" href={cookiePolicy}>
        {cookieLabel}
      </a>
    </div>
  );
}
