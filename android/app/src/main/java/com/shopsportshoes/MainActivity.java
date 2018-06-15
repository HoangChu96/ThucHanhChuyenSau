package com.shopsportshoes;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity{

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ShopSportShoes";
    }

    private PaymentsClient mPaymentsClient;

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    mPaymentsClient =
        Wallet.getPaymentsClient(
            this,
            new Wallet.WalletOptions.Builder()
                .setEnvironment(WalletConstants.ENVIRONMENT_TEST)
                .build());
  }

    private void isReadyToPay() {
    IsReadyToPayRequest request =
        IsReadyToPayRequest.newBuilder()
            .addAllowedPaymentMethod(WalletConstants.PAYMENT_METHOD_CARD)
            .addAllowedPaymentMethod(WalletConstants.PAYMENT_METHOD_TOKENIZED_CARD)
            .build();
    Task<Boolean> task = mPaymentsClient.isReadyToPay(request);
    task.addOnCompleteListener(
        new OnCompleteListener<Boolean>() {
          public void onComplete(Task<Boolean> task) {
            try {
              boolean result = task.getResult(ApiException.class);
              if (result == true) {
                // Show Google as payment option.
              } else {
                // Hide Google as payment option.
              }
            } catch (ApiException exception) {
            }
          }
        });
  }

  private PaymentDataRequest createPaymentDataRequest() {
    PaymentDataRequest.Builder request =
        PaymentDataRequest.newBuilder()
            .setTransactionInfo(
                TransactionInfo.newBuilder()
                    .setTotalPriceStatus(WalletConstants.TOTAL_PRICE_STATUS_FINAL)
                    .setTotalPrice("10.00")
                    .setCurrencyCode("USD")
                    .build())
            .addAllowedPaymentMethod(WalletConstants.PAYMENT_METHOD_CARD)
            .addAllowedPaymentMethod(WalletConstants.PAYMENT_METHOD_TOKENIZED_CARD)
            .setCardRequirements(
                CardRequirements.newBuilder()
                    .addAllowedCardNetworks(
                        Arrays.asList(
                            WalletConstants.CARD_NETWORK_AMEX,
                            WalletConstants.CARD_NETWORK_DISCOVER,
                            WalletConstants.CARD_NETWORK_VISA,
                            WalletConstants.CARD_NETWORK_MASTERCARD))
                    .build());

    PaymentMethodTokenizationParameters params =
        PaymentMethodTokenizationParameters.newBuilder()
            .setPaymentMethodTokenizationType(
                WalletConstants.PAYMENT_METHOD_TOKENIZATION_TYPE_PAYMENT_GATEWAY)
            .addParameter("gateway", "example")
            .addParameter("gatewayMerchantId", "exampleGatewayMerchantId")
            .build();

    request.setPaymentMethodTokenizationParameters(params);
    return request.build();
  }
}
