import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from "@/components/HelloWave";

export default function concerts() {
    return(
        <ThemedView style={styles.container}>
            <HelloWave />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '80%',
    }
})