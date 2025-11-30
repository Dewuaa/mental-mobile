import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, RADIUS, SHADOWS, FONTS, SPACING } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Sun, Cloud, CloudRain, CloudLightning, Sparkles } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 64;
const CHART_HEIGHT = 180;
const BAR_WIDTH = 16;
const MAX_VALUE = 5;

interface MoodData {
  date: string;
  value: number; // 1-5
}

interface MoodChartProps {
  data: MoodData[];
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const getMoodColor = (value: number): string => {
  if (value >= 4) return COLORS.orange[500]; // Good/Great
  if (value === 3) return COLORS.teal[400];   // Okay
  return COLORS.slate[400];                    // Down/Rough
};

const getMoodLabel = (value: number): string => {
  const labels = ['Rough', 'Down', 'Okay', 'Good', 'Great'];
  return labels[Math.round(value) - 1] || 'Okay';
};

const getMoodIcon = (value: number) => {
  const roundedValue = Math.round(value);
  if (roundedValue === 1) return CloudLightning;
  if (roundedValue === 2) return CloudRain;
  if (roundedValue === 3) return Cloud;
  if (roundedValue === 4) return Sun;
  return Sparkles; // 5
};

export const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'thisWeek' | 'lastWeek'>('thisWeek');
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const animations = data.map(() => useSharedValue(0));

  useEffect(() => {
    // Reset and restart animations when tab changes
    animations.forEach((anim) => {
      anim.value = 0;
    });
    
    animations.forEach((anim, index) => {
      anim.value = withDelay(
        index * 100,
        withTiming(1, {
          duration: 600,
          easing: Easing.out(Easing.exp),
        })
      );
    });
    setSelectedBar(null); // Clear selection when switching tabs
  }, [activeTab]);

  const spacing = (CHART_WIDTH - BAR_WIDTH * data.length) / (data.length + 1);
  const getBarX = (index: number) => spacing + index * (BAR_WIDTH + spacing);
  const getBarHeight = (value: number) => ((value / MAX_VALUE) * (CHART_HEIGHT - 60));
  const getBarY = (value: number) => CHART_HEIGHT - 40 - getBarHeight(value);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Calendar size={16} color={COLORS.orange[400]} />
            </View>
            <Text style={styles.title}>Mood History</Text>
          </View>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'thisWeek' && styles.activeTab]}
              onPress={() => setActiveTab('thisWeek')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === 'thisWeek' ? styles.activeTabText : styles.inactiveTabText]}>
                This Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'lastWeek' && styles.activeTab]}
              onPress={() => setActiveTab('lastWeek')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === 'lastWeek' ? styles.activeTabText : styles.inactiveTabText]}>
                Last Week
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            {/* Grid Lines */}
            {[1, 2, 3, 4, 5].map((tick) => {
              const y = CHART_HEIGHT - 40 - ((tick / MAX_VALUE) * (CHART_HEIGHT - 60));
              return (
                <G key={tick}>
                  <Rect
                    x={0}
                    y={y}
                    width={CHART_WIDTH}
                    height={1}
                    fill={COLORS.slate[100]}
                    opacity={0.5}
                  />
                </G>
              );
            })}

            {/* Bars */}
            {data.map((item, index) => {
              const barHeight = getBarHeight(item.value);
              const barY = getBarY(item.value);
              const barX = getBarX(index);
              const color = getMoodColor(item.value);
              const isSelected = selectedBar === index;

              const animatedProps = useAnimatedProps(() => ({
                height: animations[index].value * barHeight,
                y: barY + (1 - animations[index].value) * barHeight,
              }));

              return (
                <G key={index}>
                  <AnimatedRect
                    x={barX}
                    width={BAR_WIDTH}
                    fill={color}
                    rx={8}
                    ry={8}
                    opacity={isSelected ? 1 : 0.8}
                    animatedProps={animatedProps}
                  />
                  {/* Selection indicator */}
                  {isSelected && (
                    <Rect
                      x={barX - 2}
                      y={barY - 2}
                      width={BAR_WIDTH + 4}
                      height={barHeight + 4}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      rx={10}
                      ry={10}
                      opacity={0.5}
                    />
                  )}
                </G>
              );
            })}

            {/* X-axis labels */}
            {data.map((item, index) => {
              const x = getBarX(index) + BAR_WIDTH / 2;
              const dayLabel = days[index] || item.date.substring(0, 3);
              
              return (
                <SvgText
                  key={`label-${index}`}
                  x={x}
                  y={CHART_HEIGHT - 15}
                  fontSize={12}
                  fill={selectedBar === index ? COLORS.slate[700] : COLORS.slate[500]}
                  fontWeight={selectedBar === index ? '700' : '500'}
                  textAnchor="middle"
                >
                  {dayLabel}
                </SvgText>
              );
            })}
          </Svg>

          {/* Invisible touch targets */}
          <View style={styles.touchLayer}>
            {data.map((item, index) => {
              const barX = getBarX(index);
              return (
                <TouchableOpacity
                  key={`touch-${index}`}
                  style={[
                    styles.touchTarget,
                    {
                      left: barX - 10,
                      width: BAR_WIDTH + 20,
                    },
                  ]}
                  onPress={() => setSelectedBar(selectedBar === index ? null : index)}
                  activeOpacity={0.7}
                />
              );
            })}
          </View>

          {/* Tooltip */}
          {selectedBar !== null && (
            <View
              style={[
                styles.tooltip,
                {
                  left: getBarX(selectedBar) + BAR_WIDTH / 2 - 60,
                  top: getBarY(data[selectedBar].value) - 60,
                },
              ]}
            >
              <Text style={styles.tooltipDay}>{days[selectedBar]}</Text>
              <View style={styles.tooltipMoodContainer}>
                {(() => {
                  const MoodIcon = getMoodIcon(data[selectedBar].value);
                  return <MoodIcon size={20} color={getMoodColor(data[selectedBar].value)} />;
                })()}
                <Text style={styles.tooltipMood}>{getMoodLabel(data[selectedBar].value)}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.slate[400] }]} />
            <Text style={styles.legendText}>Down</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.teal[400] }]} />
            <Text style={styles.legendText}>Okay</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.orange[500] }]} />
            <Text style={styles.legendText}>Good</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: SPACING.md,
  },
  container: {
    borderRadius: RADIUS['3xl'],
    padding: SPACING.lg,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.orange[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.slate[100],
    borderRadius: RADIUS.xl,
    padding: 4,
    gap: 4,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.lg,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    ...SHADOWS.soft,
  },
  tabText: {
    fontSize: 10,
    fontWeight: '700',
  },
  activeTabText: {
    color: COLORS.slate[800],
  },
  inactiveTabText: {
    color: COLORS.slate[400],
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.slate[100],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[600],
    fontWeight: '500',
  },
  touchLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CHART_HEIGHT - 40,
    flexDirection: 'row',
  },
  touchTarget: {
    position: 'absolute',
    height: '100%',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.xl,
    ...SHADOWS.medium,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
  },
  tooltipDay: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.slate[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tooltipMoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  tooltipMood: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.slate[900],
  },
});
