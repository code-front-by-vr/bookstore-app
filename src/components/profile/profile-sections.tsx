'use client'

import type {ProfileSectionsProps} from '@/types/profile'
import ProfilePersonal from './profile-personal'
import ProfilePreferences from './profile-preferences'
import ProfileRecentActivity from './profile-recent-activity'
import ProfileStats from './profile-stats'

export default function ProfileSections({user, stats}: ProfileSectionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      <div className="lg:col-span-2">
        <ProfilePersonal user={user} />
      </div>

      <ProfileStats stats={stats} />

      <div className="lg:col-span-2">
        <ProfilePreferences user={user} />
      </div>

      <ProfileRecentActivity stats={stats} />
    </div>
  )
}
