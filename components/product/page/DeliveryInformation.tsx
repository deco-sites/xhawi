/**
 * @title {{{title}}}
 */
interface DeliveryInformationItem {
  title: string;
  /**
   * @format textarea
   */
  description: string;
}

export interface DeliveryInformationProps {
  title?: string;
  items?: DeliveryInformationItem[];
}

export default function DeliveryInformation(props: DeliveryInformationProps) {
  const { title, items } = props;

  return (
    <div class="flex flex-col gap-4 lg:gap-6">
      <div class="delivery-Information-label text-base font-medium">
        {title}
      </div>
      <ul class="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
        {items?.map((item) => (
          <li>
            <div class="same-day-delivery-text text-sm font-medium">
              {item.title}
            </div>
            <div class="same-day-delivery-description max-w-[260px] text-xs">
              {item.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
