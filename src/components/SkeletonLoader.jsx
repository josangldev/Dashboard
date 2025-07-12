export default function SkeletonLoader({ height = 40, width = '100%', className = '' }) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
      style={{ height, width }}
    />
  );
} 