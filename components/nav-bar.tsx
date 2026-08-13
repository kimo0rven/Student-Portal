import { Link, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const TABS = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/details', label: 'Product Details' },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} style={styles.link}>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d0d0d0',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  link: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: '#687076',
  },
  activeLabel: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
});
