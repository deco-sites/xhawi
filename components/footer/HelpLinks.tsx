/**
 * @title {{{text}}}
 */
interface HelpLink {
  href: string;
  text: string;
}

export interface HelpLinksProps {
  title: string;
  links: HelpLink[];
}

export default function HelpLinks(props: HelpLinksProps) {
  const { title, links } = props;

  return (
    <div class="footer-link-wrapper my-3 basis-1/2 md:basis-1/4 order-2 md:order-last">
      <h3 class="mb-6 text-base font-bold Letushelpyou-footer-heading">
        {title}
      </h3>
      <ul class="list-none" id="footerLinkList">
        {links.map((link) => (
          <li class="footer-link my-1">
            <a
              hreflang="en-US"
              class="footer-url text-sm"
              href={link.href}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
