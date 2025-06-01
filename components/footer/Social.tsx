/**
 * @title {{{text}}}
 */
interface Social {
  href: string;
  text: string;
}

export interface SocialProps {
  title: string;
  socials: Social[];
}

export default function Social(props: SocialProps) {
  const { title, socials } = props;

  return (
    <div class="footer-link-wrapper my-3 basis-1/2 md:basis-1/4 lg:block">
      <h3 class="mb-6 text-base font-bold Connectwithus-footer-heading">
        {title}
      </h3>
      <ul class="list-none" id="footerLinkList">
        {socials.map((social) => (
          <li class="footer-link my-1">
            <a
              href={social.href}
              class="footer-url text-sm"
              target="_blank"
            >
              {social.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
