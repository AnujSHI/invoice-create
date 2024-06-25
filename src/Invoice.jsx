// src/Invoice.js
import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  signature: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'right',
  }
});

const Invoice = ({
  logo,
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  placeOfDelivery,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  items,
  signatureImage
}) => {
  // Calculate derived fields
  const calculateNetAmount = (unitPrice, quantity, discount) => {
    return unitPrice * quantity - discount;
  };

  const calculateTaxAmount = (netAmount, taxRate) => {
    return netAmount * taxRate / 100;
  };

  const calculateTotalAmount = (netAmount, taxAmount) => {
    return netAmount + taxAmount;
  };

  const calculateAmounts = (items, placeOfSupply, placeOfDelivery) => {
    return items.map(item => {
      const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
      const taxRate = 18;
      const taxType = placeOfSupply === placeOfDelivery ? ['CGST', 'SGST'] : ['IGST'];
      const taxAmount = calculateTaxAmount(netAmount, taxRate);
      const totalAmount = calculateTotalAmount(netAmount, taxAmount);
      return {
        ...item,
        netAmount,
        taxRate,
        taxType,
        taxAmount,
        totalAmount
      };
    });
  };

  const itemDetails = calculateAmounts(items, placeOfSupply, placeOfDelivery);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Image src={logo} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Seller Details</Text>
          {Object.entries(sellerDetails).map(([key, value]) => (
            <Text key={key} style={styles.text}>{key}: {value}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Place of Supply: {placeOfSupply}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Billing Details</Text>
          {Object.entries(billingDetails).map(([key, value]) => (
            <Text key={key} style={styles.text}>{key}: {value}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Shipping Details</Text>
          {Object.entries(shippingDetails).map(([key, value]) => (
            <Text key={key} style={styles.text}>{key}: {value}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Place of Delivery: {placeOfDelivery}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Order Details</Text>
          {Object.entries(orderDetails).map(([key, value]) => (
            <Text key={key} style={styles.text}>{key}: {value}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Invoice Details</Text>
          {Object.entries(invoiceDetails).map(([key, value]) => (
            <Text key={key} style={styles.text}>{key}: {value}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Reverse Charge: {reverseCharge ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Unit Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Discount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Net Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tax</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total Amount</Text>
            </View>
          </View>
          {itemDetails.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.unitPrice}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.discount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.netAmount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.taxType.join(' / ')}: {item.taxAmount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.totalAmount}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.signature}>
          <Image src={signatureImage} />
          <Text>Authorised Signatory</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
