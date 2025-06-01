/**
 * @title {{{text}}}
 */
interface Link {
  href: string;
  text: string;
}

export interface LinksProps {
  title: string;
  links: Link[];
}

export default function Links(props: LinksProps) {
  const { title, links } = props;

  return (
    <div class="footer-link-wrapper my-3 basis-1/2 md:basis-1/4">
      <h3 class="mb-6 text-base font-bold Gettoknowus-footer-heading">
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
