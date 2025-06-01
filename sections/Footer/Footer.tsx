import BackToTop from "../../components/footer/BackToTop.tsx";
import Copyright, {
  CopyrightProps,
} from "../../components/footer/Copyright.tsx";
import DownloadApps, {
  DownloadAppsProps,
} from "../../components/footer/DownloadApps.tsx";
import HelpLinks, {
  HelpLinksProps,
} from "../../components/footer/HelpLinks.tsx";
import Links, { LinksProps } from "../../components/footer/Links.tsx";
import Policy, { PolicyProps } from "../../components/footer/Policy.tsx";
import Social, { SocialProps } from "../../components/footer/Social.tsx";
import Image, { ImagePropsWithAlt } from "../../components/images/Image.tsx";

interface Props {
  logo: ImagePropsWithAlt;
  downloadSection?: DownloadAppsProps;
  linksSection?: LinksProps;
  socialSection?: SocialProps;
  helpLinksSection?: HelpLinksProps;
  copyrightSection?: CopyrightProps;
  policySection?: PolicyProps;
}

export default function Footer(props: Props) {
  const {
    logo,
    downloadSection,
    linksSection,
    socialSection,
    helpLinksSection,
    copyrightSection,
    policySection,
  } = props;

  return (
    <footer class="footer bg-omantel-faded-black">
      <div class="">
        <BackToTop />
        <div class="px-4 py-4 text-white lg:px-12 lg:py-9">
          <div class="mb-4 flex flex-row flex-wrap">
            <div class="my-2 basis-full md:basis-1/4">
              <div class="my-2 flex md:justify-start">
                <Image sources={logo} />
              </div>
              {downloadSection && <DownloadApps {...downloadSection} />}
            </div>
            <div class="my-2 basis-full md:basis-2/3">
              <div class="flex flex-row flex-wrap">
                {linksSection && <Links {...linksSection} />}
                {socialSection && <Social {...socialSection} />}
                {helpLinksSection && <HelpLinks {...helpLinksSection} />}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col-reverse gap-4 border-t border-omantel-platinum px-4 py-5 text-white lg:flex-row lg:justify-between lg:px-12">
          {copyrightSection && <Copyright {...copyrightSection} />}
          {policySection && <Policy {...policySection} />}
        </div>
      </div>
    </footer>
  );
}

export function LoadingFallback(props: Props) {
  return <Footer {...props} />;
}
