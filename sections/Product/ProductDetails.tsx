import { useDevice } from "@deco/deco/hooks";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Breadcrumb from "../../components/product/page/Breadcrumb.tsx";
import Colors from "../../components/product/page/colors/Colors.tsx";
import ImageGallery from "../../components/product/page/ImageGallery.tsx";
import ShareButton from "../../components/product/page/share/Button.tsx";
import SharePopup from "../../components/product/page/share/Popup.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useI18n } from "../../sdk/i18n.ts";
import { getColors, getHighlight } from "../../sdk/products.ts";
import { useOffer } from "../../sdk/useOffer.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails(props: Props) {
  const { page } = props;

  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  const product = page.product;
  const breadcrumbList = page.breadcrumbList;

  const { language, translations } = useI18n(props);
  const { inventoryLevel, price, sellerName } = useOffer(product.offers);
  const isMobile = useDevice() !== "desktop";

  const name = product.name;
  const images = product.image || [];
  const productUrl = product.url!;
  const brand = product.brand;
  const highlight = getHighlight(product, language);
  const colors = getColors(product);

  console.log(product);

  return (
    <div class="min-h-144 relative w-full">
      <Breadcrumb breadcrumbList={breadcrumbList} />

      <div class="container-fluid">
        <div class="container-width">
          {isMobile
            ? <></>
            // ? (
            //   <div class="block lg:hidden" id="productDescriptionMobile">
            //     <div>
            //       <div>
            //         <div
            //           id="PDPImageGalleryMobile"
            //           class="relative w-[341px] h-[341px] px-[85px] py-[43px]"
            //         >
            //           <div
            //             class="slick-slider  disable-dragging  slick-initialized"
            //             dir="ltr"
            //           >
            //             <div class="slick-list">
            //               <div
            //                 class="slick-track"
            //                 style="opacity: 1; transform: translate3d(0px, 0px, 0px);"
            //               >
            //                 <div
            //                   data-index="-1"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157325/HUAWEI-Pura-70-Pro_White_Bottoms_Wallpaper.png.png?v=638787822785970000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="0"
            //                   class="slick-slide slick-active slick-current"
            //                   tabindex="-1"
            //                   aria-hidden="false"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157313/image-963066249ba347aca971e19595fae0fb.jpg?v=638787822784570000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="1"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157314/HUAWEI-Pura-70-Pro_White_Rear_expand_Wallpaper_RGB-拷贝.png.png?v=638787822784730000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="2"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157315/HUAWEI-Pura-70-Pro_White_Front_Wallpaper.png.png?v=638787822784870000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="3"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157316/HUAWEI-Pura-70-Pro_White_Rear_30_Left_Wallpaper.png.png?v=638787822785030000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="4"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157317/HUAWEI-Pura-70-Pro_White_Front_30_Left_Wallpaper.png.png?v=638787822785030000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="5"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157318/HUAWEI-Pura-70-Pro_White_Rear_30_Right_Wallpaper.png.png?v=638787822785200000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="6"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157319/HUAWEI-Pura-70-Pro_White_Front_30_Right_Wallpaper.png.png?v=638787822785200000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="7"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157320/HUAWEI-Pura-70-Pro_White_Rear_Horizontal_Wallpaper.png.png?v=638787822785330000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="8"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157321/HUAWEI-Pura-70-Pro_White_Front_Horizontal_Wallpaper.png.png?v=638787822785500000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="9"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157322/HUAWEI-Pura-70-Pro_White_Side_Left_Wallpaper.png.png?v=638787822785670000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="10"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157323/HUAWEI-Pura-70-Pro_White_Side_Right_Wallpaper.png.png?v=638787822785670000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="11"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157324/HUAWEI-Pura-70-Pro_White_Top_Wallpaper.png.png?v=638787822785800000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="12"
            //                   class="slick-slide"
            //                   tabindex="-1"
            //                   aria-hidden="true"
            //                   style="outline: none; width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157325/HUAWEI-Pura-70-Pro_White_Bottoms_Wallpaper.png.png?v=638787822785970000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="13"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157313/image-963066249ba347aca971e19595fae0fb.jpg?v=638787822784570000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="14"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157314/HUAWEI-Pura-70-Pro_White_Rear_expand_Wallpaper_RGB-拷贝.png.png?v=638787822784730000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="15"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157315/HUAWEI-Pura-70-Pro_White_Front_Wallpaper.png.png?v=638787822784870000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="16"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157316/HUAWEI-Pura-70-Pro_White_Rear_30_Left_Wallpaper.png.png?v=638787822785030000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="17"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157317/HUAWEI-Pura-70-Pro_White_Front_30_Left_Wallpaper.png.png?v=638787822785030000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="18"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157318/HUAWEI-Pura-70-Pro_White_Rear_30_Right_Wallpaper.png.png?v=638787822785200000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="19"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157319/HUAWEI-Pura-70-Pro_White_Front_30_Right_Wallpaper.png.png?v=638787822785200000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="20"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157320/HUAWEI-Pura-70-Pro_White_Rear_Horizontal_Wallpaper.png.png?v=638787822785330000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="21"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157321/HUAWEI-Pura-70-Pro_White_Front_Horizontal_Wallpaper.png.png?v=638787822785500000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="22"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157322/HUAWEI-Pura-70-Pro_White_Side_Left_Wallpaper.png.png?v=638787822785670000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="23"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157323/HUAWEI-Pura-70-Pro_White_Side_Right_Wallpaper.png.png?v=638787822785670000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="24"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157324/HUAWEI-Pura-70-Pro_White_Top_Wallpaper.png.png?v=638787822785800000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //                 <div
            //                   data-index="25"
            //                   tabindex="-1"
            //                   class="slick-slide slick-cloned"
            //                   aria-hidden="true"
            //                   style="width: 0px;"
            //                 >
            //                   <div>
            //                     <div
            //                       tabindex="-1"
            //                       style="width: 100%; display: inline-block;"
            //                     >
            //                       <div class="react-transform-wrapper transform-component-module_wrapper__SPB86 ">
            //                         <div
            //                           class="react-transform-component transform-component-module_content__FBWxo "
            //                           style="transform: translate(0px, 0px) scale(1);"
            //                         >
            //                           <img
            //                             src="https://omanshop.vtexassets.com/arquivos/ids/157325/HUAWEI-Pura-70-Pro_White_Bottoms_Wallpaper.png.png?v=638787822785970000"
            //                             alt=""
            //                             data-cookiecategory="21"
            //                           />
            //                         </div>
            //                       </div>
            //                       <div class="tools flex justify-center gap-1">
            //                         <button>
            //                           <img
            //                             alt="Zoom In"
            //                             loading="lazy"
            //                             width="28"
            //                             height="28"
            //                             decoding="async"
            //                             data-nimg="1"
            //                             class="!p-0"
            //                             src="/icons/zoom-icon.svg"
            //                             data-cookiecategory="21"
            //                             style="color: transparent;"
            //                           />
            //                         </button>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //               </div>
            //             </div>
            //             <ul class="slick-dots" style="display: block;">
            //               <li class="slick-active">
            //                 <button>1</button>
            //               </li>
            //               <li class="">
            //                 <button>2</button>
            //               </li>
            //               <li class="">
            //                 <button>3</button>
            //               </li>
            //               <li class="">
            //                 <button>4</button>
            //               </li>
            //               <li class="">
            //                 <button>5</button>
            //               </li>
            //               <li class="">
            //                 <button>6</button>
            //               </li>
            //               <li class="">
            //                 <button>7</button>
            //               </li>
            //               <li class="">
            //                 <button>8</button>
            //               </li>
            //               <li class="">
            //                 <button>9</button>
            //               </li>
            //               <li class="">
            //                 <button>10</button>
            //               </li>
            //               <li class="">
            //                 <button>11</button>
            //               </li>
            //               <li class="">
            //                 <button>12</button>
            //               </li>
            //               <li class="">
            //                 <button>13</button>
            //               </li>
            //             </ul>
            //           </div>
            //         </div>
            //         <div class="absolute top-0 h-10 w-[60px] flex-shrink-0 ltr:right-0 rtl:left-0">
            //           <div class="social-share" id="socialShare">
            //             <div
            //               role="menubar"
            //               class="flex items-center space-x-1 rounded-md bg-background p-1 border-0 lg:pt-0 pt-8"
            //               tabindex="0"
            //               data-orientation="horizontal"
            //               style="outline: none;"
            //             >
            //               <div role="group">
            //                 <button
            //                   type="button"
            //                   role="menuitem"
            //                   id="radix-:r2i:"
            //                   aria-haspopup="menu"
            //                   aria-expanded="false"
            //                   data-state="closed"
            //                   class="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            //                   tabindex="-1"
            //                   data-orientation="horizontal"
            //                   data-radix-collection-item=""
            //                 >
            //                   <img
            //                     alt="Share"
            //                     loading="lazy"
            //                     width="20"
            //                     height="20"
            //                     decoding="async"
            //                     data-nimg="1"
            //                     src="/icons/share.svg"
            //                     data-cookiecategory="21"
            //                     style="color: transparent;"
            //                   />
            //                 </button>
            //               </div>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div>
            //         <div class="text-xs font-semibold uppercase">
            //           <a href="/b/huawei">Huawei</a>
            //         </div>
            //         <div class="mb-4 text-xl font-normal">
            //           HUAWEI Pura 70 Pro
            //         </div>
            //         <div class="mb-4 flex items-center gap-1">
            //           <div class="in-stock-label h-2 w-2 rounded-full bg-omantel-dark-green">
            //           </div>
            //           <div class="ml-2 text-sm font-medium text-omantel-grey">
            //             In
            //             Stock<span class="text-omantel-alert-dark ltr:ml-2 rtl:mr-2">
            //               (few items left)
            //             </span>
            //           </div>
            //         </div>
            //       </div>
            //       <div class="pb-4">
            //         <div class="text-sm font-medium">
            //           <span class="rtl:hidden">Color: White</span>
            //           <span class="ltr:hidden">Color: #FFFFFF</span>
            //         </div>
            //         <div class="mt-3 flex flex-wrap gap-4">
            //           <button
            //             class="h-8 w-8 cursor-pointer rounded-full shadow-[0px_0px_0px_5px_#95c655]"
            //             aria-label="Select color White|#FFFFFF"
            //             aria-pressed="true"
            //             style="background-color: rgb(255, 255, 255); outline: rgb(255, 255, 255) solid 3px;"
            //           >
            //           </button>
            //           <button
            //             class="h-8 w-8 cursor-pointer rounded-full false"
            //             aria-label="Select color Black|#000000"
            //             aria-pressed="false"
            //             style="background-color: rgb(0, 0, 0); outline: 0px;"
            //           >
            //           </button>
            //         </div>
            //       </div>
            //       <div>
            //         <div class="pt-3">
            //           <div class="flex items-center gap-2">
            //             <div class="text-2xl font-bold text-omantel-secondary-blue">
            //               <span class="mr-1 text-[14px]">OMR</span>
            //               <span>319.900</span>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div class="mb-4 text-xs text-[#808080]">
            //         Price inclusive of VAT
            //       </div>
            //       <div class=" mb-2 flex flex-wrap items-center justify-between gap-3">
            //         <div class="numeric-stepper-container flex items-center gap-2">
            //           <button
            //             class="decrement flex items-center justify-center rounded border lg:border-2  disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black"
            //             disabled=""
            //           >
            //             -
            //           </button>
            //           <div class="">
            //             <input
            //               class="flex rounded-md valid:placeholder-shown:border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-omantel-dark-green disabled:cursor-not-allowed dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus:border-omantel-dark-green valid:border-omantel-faded-black valid:text-omantel-faded-black focus:valid:text-omantel-grey-3 quantity-value border lg:border-2 text-center disabled:opacity-50 h-12 w-20 border-[#EBEBEB] lg:border-black sm:w-36"
            //               readonly=""
            //               value="1"
            //             />
            //           </div>
            //           <button class="increment flex items-center justify-center rounded border lg:border-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black">
            //             +
            //           </button>
            //         </div>
            //         <div class="flex-grow ">
            //           <div class="flex flex-col gap-2">
            //             <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey h-12 w-full">
            //               Add to Cart
            //             </button>
            //           </div>
            //         </div>
            //       </div>
            //       <div class="border-b py-6">
            //         <div class="mb-2 flex gap-3 text-sm">
            //           <img
            //             alt="shipfrom"
            //             loading="lazy"
            //             width="20"
            //             height="20"
            //             decoding="async"
            //             data-nimg="1"
            //             src="/icons/shipping.svg"
            //             data-cookiecategory="21"
            //             style="color: transparent;"
            //           />
            //           <div>Ships from:</div>
            //           <div class="font-semibold">Huawei</div>
            //         </div>
            //         <div class="mb-2 flex gap-3 text-sm">
            //           <img
            //             alt="sellerName"
            //             loading="lazy"
            //             width="20"
            //             height="20"
            //             decoding="async"
            //             data-nimg="1"
            //             src="/icons/soldby.svg"
            //             data-cookiecategory="21"
            //             style="color: transparent;"
            //           />
            //           <div>Sold by:</div>
            //           <div class="font-semibold">Huawei</div>
            //           <span class="pl-2"></span>
            //         </div>
            //         <div class="flex gap-3 text-sm">
            //           <img
            //             alt="Payment"
            //             loading="lazy"
            //             width="20"
            //             height="20"
            //             decoding="async"
            //             data-nimg="1"
            //             src="/icons/securepayment.svg"
            //             data-cookiecategory="21"
            //             style="color: transparent;"
            //           />
            //           <div>Payment:</div>
            //           <div class="font-semibold">Secure transaction</div>
            //         </div>
            //       </div>
            //       <div class="flex flex-row gap-6 border-b py-6">
            //         <div class="flex flex-col gap-4">
            //           <div class="delivery-Information-label text-base font-medium">
            //             Delivery Information
            //           </div>
            //           <div>
            //             <div class="same-day-delivery-text text-sm font-semibold">
            //               Same Day Delivery
            //             </div>
            //             <div class="same-day-delivery-description max-w-[260px] text-xs">
            //               Orders placed after 3 PM GST cannot be fulfilled on
            //               the same day
            //             </div>
            //           </div>
            //           <div>
            //             <div class="next-day-delivery-text text-sm font-semibold">
            //               Next Day Delivery
            //             </div>
            //             <div class="next-day-delivery-description max-w-[260px] text-xs">
            //               Receive your order within the next day
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div>
            //         <div class="w-full px-0 py-0" data-orientation="vertical">
            //           <div
            //             data-state="open"
            //             data-orientation="vertical"
            //             class="border-b mb-6 mt-10 rounded-lg border-none bg-omantel-smoke p-6"
            //           >
            //             <h3
            //               data-orientation="vertical"
            //               data-state="open"
            //               class="flex"
            //             >
            //               <button
            //                 type="button"
            //                 aria-controls="radix-:r2m:"
            //                 aria-expanded="true"
            //                 data-state="open"
            //                 data-orientation="vertical"
            //                 id="radix-:r2l:"
            //                 class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]&gt;svg]:rotate-180"
            //                 data-radix-collection-item=""
            //               >
            //                 <div class="text-xl">Product Description</div>
            //                 <svg
            //                   xmlns="http://www.w3.org/2000/svg"
            //                   width="24"
            //                   height="24"
            //                   viewBox="0 0 24 24"
            //                   fill="none"
            //                   stroke="currentColor"
            //                   stroke-width="2"
            //                   stroke-linecap="round"
            //                   stroke-linejoin="round"
            //                   class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
            //                 >
            //                   <path d="m6 9 6 6 6-6"></path>
            //                 </svg>
            //               </button>
            //             </h3>
            //             <div
            //               data-state="open"
            //               id="radix-:r2m:"
            //               role="region"
            //               aria-labelledby="radix-:r2l:"
            //               data-orientation="vertical"
            //               class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            //               style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width); transition-duration: 0s; animation-name: none;"
            //             >
            //               <div class="pb-4 pt-0">
            //                 <div class="py-4 text-[#697077]">
            //                   <p>
            //                     HUAWEI Pura 70 Pro is a high-end smartphone
            //                     released in May 2024, featuring a 6.6-inch LTPO
            //                     OLED display with a resolution of 1256 x 2760
            //                     pixels and a 120Hz refresh rate. It is powered
            //                     by the Kirin 9000S1 chipset and comes with 12GB
            //                     of RAM and storage options ranging from 256GB to
            //                     1TB. The device boasts a triple camera setup: a
            //                     50 MP wide lens with variable aperture
            //                     (f/1.4-4.0), a 12 MP periscope telephoto lens
            //                     with 5x optical zoom, and a 13 MP ultrawide
            //                     lens. The front camera is 13 MP. The Pura 70 Pro
            //                     runs on HarmonyOS 4.2 and is equipped with a
            //                     4900 mAh battery supporting 66W wired and 50W
            //                     wireless charging
            //                   </p>
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //           <div
            //             data-state="closed"
            //             data-orientation="vertical"
            //             class="border-b rounded-lg border-none bg-omantel-smoke p-6"
            //           >
            //             <h3
            //               data-orientation="vertical"
            //               data-state="closed"
            //               class="flex"
            //             >
            //               <button
            //                 type="button"
            //                 aria-controls="radix-:r2o:"
            //                 aria-expanded="false"
            //                 data-state="closed"
            //                 data-orientation="vertical"
            //                 id="radix-:r2n:"
            //                 class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]&gt;svg]:rotate-180"
            //                 data-radix-collection-item=""
            //               >
            //                 <div class="text-xl">Product Specifications</div>
            //                 <svg
            //                   xmlns="http://www.w3.org/2000/svg"
            //                   width="24"
            //                   height="24"
            //                   viewBox="0 0 24 24"
            //                   fill="none"
            //                   stroke="currentColor"
            //                   stroke-width="2"
            //                   stroke-linecap="round"
            //                   stroke-linejoin="round"
            //                   class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
            //                 >
            //                   <path d="m6 9 6 6 6-6"></path>
            //                 </svg>
            //               </button>
            //             </h3>
            //             <div
            //               data-state="closed"
            //               id="radix-:r2o:"
            //               hidden=""
            //               role="region"
            //               aria-labelledby="radix-:r2n:"
            //               data-orientation="vertical"
            //               class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            //               style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
            //             >
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // )
            : (
              <div class="hidden lg:block" id="productDescription">
                <div class="grid w-full grid-cols-2 pb-6 transition-all duration-200 ease-linear transform opacity-100 translate-x-0">
                  <div class="relative max-w-2xl">
                    <ImageGallery images={images} highlight={highlight} />
                    <div class="absolute top-0 h-10 w-[60px] flex-shrink-0 ltr:right-0 rtl:left-0">
                      <div class="relative">
                        <ShareButton />
                        <SharePopup productUrl={productUrl} />
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-6 rounded-lg border p-10 pt-8">
                    <div class="flex flex-col gap-4">
                      {brand?.name && (
                        <div class="brand-name -mb-3 text-xs font-semibold uppercase">
                          <a href={`/b/${brand.name}`}>{brand.name}</a>
                        </div>
                      )}
                      <div class="product-name font-halogen text-[32px] font-normal leading-9">
                        {name}
                      </div>
                      <div class="in-stock-label flex flex-row items-center gap-2">
                        <div class="in-stock-label h-2 w-2 rounded-full bg-omantel-dark-green">
                        </div>
                        <div class="text-base font-normal text-omantel-grey">
                          {translations.product.inStock}
                          {typeof inventoryLevel === "number" &&
                            inventoryLevel < 10 &&
                            (
                              <span class="text-omantel-alert-dark ltr:ml-2 rtl:mr-2">
                                {translations.product.fewItemsLeft}
                              </span>
                            )}
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center gap-3 text-omantel-secondary-blue">
                          <span class="ar-row-reverse">
                            <span class=" omr-label text-[16px]  font-bold">
                              {translations.product.omr}
                            </span>{" "}
                            <span class="display-price pl-1 text-2xl font-semibold">
                              {formatPrice(price)}
                            </span>
                          </span>
                        </div>
                        <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tax-description text-sm font-normal text-omantel-grey">
                          {translations.product.priceInclusiveOfVAT}
                        </label>
                      </div>
                    </div>
                    {colors.length > 1 && <Colors colors={colors} />}
                    <div class="ar-row-reverse ar-justify-content-fe flex flex-row gap-6 border-t pt-6">
                      <div class="flex flex-row justify-center items-center gap-4 text-sm">
                        <Icon id="shipping" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="ships-from text-omantel-faded-black">
                            Ships from:
                          </div>
                          <div class="ships-from-seller-name font-medium">
                            {sellerName}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row justify-center items-center gap-4 text-sm ">
                        <Icon id="sold-by" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="sold-by text-omantel-faded-black">
                            Sold by:
                          </div>
                          <div class="sold-by-seller-name cursor-pointer font-medium">
                            {sellerName}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row justify-center items-center gap-4 text-sm">
                        <Icon id="secure-payment" size={20} />
                        <div class="flex flex-col justify-center">
                          <div class="payment text-omantel-faded-black">
                            Payment:
                          </div>
                          <div class="payment-text font-medium">
                            Secure transaction
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 border-t pt-6">
                      <div class="numeric-stepper-container flex items-center gap-2">
                        <button
                          type="button"
                          class="decrement flex items-center justify-center rounded border lg:border-2  disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black"
                          disabled
                        >
                          -
                        </button>
                        <div class="">
                          <input
                            class="flex rounded-md valid:placeholder-shown:border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-omantel-dark-green disabled:cursor-not-allowed dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus:border-omantel-dark-green valid:border-omantel-faded-black valid:text-omantel-faded-black focus:valid:text-omantel-grey-3 quantity-value border lg:border-2 text-center disabled:opacity-50 h-12 w-20 border-[#EBEBEB] lg:border-black sm:w-36"
                            readonly
                            value="1"
                          />
                        </div>
                        <button
                          type="button"
                          class="increment flex items-center justify-center rounded border lg:border-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 w-12 border-[#EBEBEB] lg:border-black"
                        >
                          +
                        </button>
                      </div>
                      <div class="flex-grow ">
                        <div class="flex flex-col gap-2">
                          <button
                            type="button"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey h-12 w-full max-w-[320px]"
                            id="addToCartButton"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-row gap-6 border-t pt-6">
                      <div class="flex flex-col gap-6">
                        <div class="delivery-Information-label text-base font-medium">
                          Delivery Information
                        </div>
                        <div class="flex flex-row justify-between">
                          <div>
                            <div class="same-day-delivery-text text-sm font-medium">
                              Same Day Delivery
                            </div>
                            <div class="same-day-delivery-description max-w-[260px] text-xs">
                              Orders placed after 3 PM GST cannot be fulfilled
                              on the same day
                            </div>
                          </div>
                          <div>
                            <div class="next-day-delivery-text text-sm font-semibold">
                              Next Day Delivery
                            </div>
                            <div class="next-day-delivery-description max-w-[260px] text-xs">
                              Receive your order within the next day
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col pt-12">
                  <div class="w-full px-0 py-0 " data-orientation="vertical">
                    <div
                      data-state="closed"
                      data-orientation="vertical"
                      class="border-b Product-description-heading rounded-lg bg-omantel-smoke p-6 px-10"
                    >
                      <h3
                        data-orientation="vertical"
                        data-state="closed"
                        class="flex"
                      >
                        <button
                          type="button"
                          aria-controls="radix-:r2e:"
                          aria-expanded="false"
                          data-state="closed"
                          data-orientation="vertical"
                          id="radix-:r2d:"
                          class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]&gt;svg]:rotate-180"
                          data-radix-collection-item=""
                        >
                          <div class="text-2xl font-semibold">
                            Product Description
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </h3>
                      <div
                        data-state="closed"
                        id="radix-:r2e:"
                        hidden
                        role="region"
                        aria-labelledby="radix-:r2d:"
                        data-orientation="vertical"
                        class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                        style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
                      >
                      </div>
                    </div>
                    <div
                      data-state="closed"
                      data-orientation="vertical"
                      class="border-b product-specification-heading mt-10 rounded-lg bg-omantel-smoke p-6 px-10"
                    >
                      <h3
                        data-orientation="vertical"
                        data-state="closed"
                        class="flex"
                      >
                        <button
                          type="button"
                          aria-controls="radix-:r2g:"
                          aria-expanded="false"
                          data-state="closed"
                          data-orientation="vertical"
                          id="radix-:r2f:"
                          class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]&gt;svg]:rotate-180"
                          data-radix-collection-item=""
                        >
                          <div class="product-specification-heading-text text-2xl font-semibold">
                            Product Specifications
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </h3>
                      <div
                        data-state="closed"
                        id="radix-:r2g:"
                        hidden
                        role="region"
                        aria-labelledby="radix-:r2f:"
                        data-orientation="vertical"
                        class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                        style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
