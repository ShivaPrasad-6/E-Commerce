import { formatDate } from "../../utils/formatting";
import "./checkout.css";

export function DeliveryDate({
  cartItem,
  deliveryOptions,
  selectedDeliveryOption,
}) {
  return (
    <>
      <div className="delivery-date">
        Delivery date:
        {selectedDeliveryOption(deliveryOptions, cartItem)
          ?.estimatedDeliveryTimeMs
          ? formatDate(
              selectedDeliveryOption(deliveryOptions, cartItem)
                .estimatedDeliveryTimeMs,
            )
          : ""}
      </div>
    </>
  );
}
