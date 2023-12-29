import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PulsingGradient = ({ refreshing }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let animation;
        if (refreshing) {
            setIsAnimating(true);

            animation = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true
            });
            animation.start();
        } else {
            if (isAnimating) {

                animation = Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true
                });
                animation.start(() => setIsAnimating(false));
            }
        }

        return () => {
            if (animation) {
                animation.stop();
            }
        };
    }, [refreshing]);

    const colors = ['#B6E0FE', '#56CCF2', '#3498db', '#2F80ED'];
    

    return isAnimating ? (
        <View style={styles.gradientContainer}>
        <Animated.View style={{ opacity: fadeAnim, height: 3 }}>
            <LinearGradient
                colors={colors}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </Animated.View>
        </View >
    ) : null;
};

const styles = StyleSheet.create({
    gradientContainer: {
        position: 'absolute', 
        top: 0, 
        left: 0,
        right: 0,
        height: 3, 
        zIndex: 10,
    },
    glowEffect: {
        height: 3,
        shadowColor: "#56CCF2", 
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8, 
        shadowRadius: 20, 
    },
    gradient: {
        flex: 1,
    },
});

export default PulsingGradient;

