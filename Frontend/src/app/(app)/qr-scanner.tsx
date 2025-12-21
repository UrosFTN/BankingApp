import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { colors } from "@styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { parseNBSIpsQR } from "@services/qr-parser";
import { useIsFocused } from "@react-navigation/native";

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // Reset scan flag whenever screen gains focus
  useEffect(() => {
    if (isFocused) {
      setScanned(false);
    }
  }, [isFocused]);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    // Try to parse NBS IPS QR code
    console.log("Scanned data: ", data);
    const qrData = parseNBSIpsQR(data);

    if (qrData) {
      // Valid QR code - navigate to new payment with pre-filled data
      router.push({
        pathname: "/(app)/new-payment",
        params: {
          fromQR: "true",
          recipientName: qrData.recipientName,
          recipientAccount: qrData.recipientAccount,
          amount: qrData.amount.toString(),
          currency: qrData.currency,
          model: qrData.model || "",
          paymentCode: qrData.paymentCode || "",
          callNumber: qrData.callNumber || "",
          note: qrData.purpose || "",
        },
      });
    } else {
      // Invalid QR code - show options
      Alert.alert(
        "Invalid QR Code",
        "The QR code does not contain valid payment data.",
        [
          {
            text: "Scan Again",
            onPress: () => setScanned(false),
          },
          {
            text: "Enter Manually",
            onPress: () => router.push("/(app)/new-payment"),
          },
          {
            text: "Cancel",
            onPress: () => router.back(),
          },
        ],
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={
            isFocused && !scanned ? handleBarCodeScanned : undefined
          }
        />
        <View style={styles.overlay} pointerEvents="box-none">
          <View style={styles.topOverlay} />
          <View style={styles.middleRow}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay}>
            <Text style={styles.instructionText}>
              Align QR code within the frame
            </Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
            >
              <Ionicons name="close-circle" size={24} color={colors.white} />
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  middleRow: {
    flexDirection: "row",
    height: 250,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanArea: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: colors.lime,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  instructionText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
  },
  cancelText: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 8,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.lime,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "600",
  },
});
