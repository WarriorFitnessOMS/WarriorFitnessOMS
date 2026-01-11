import AdminDashboard from '../pages/admin/AdminDashboard'
import Approvals from '../pages/admin/Approvals'
import Payments from '../pages/admin/Payments'
import Members from '../pages/admin/Members'
import Coaches from '../pages/admin/Coaches'
import Attendance from '../pages/admin/Attendance'
import Schedule from '../pages/admin/Schedule'
import Support from '../pages/admin/Support'
import Settings from '../pages/admin/Settings'

import CoachDashboard from '../pages/coach/CoachDashboard'
import Students from '../pages/coach/Students'
import WorkoutPlans from '../pages/coach/WorkoutPlans'
import NutritionPlans from '../pages/coach/NutritionPlans'
import ExerciseVideos from '../pages/coach/ExerciseVideos'
import ProgressTracking from '../pages/coach/ProgressTracking'
import ScheduleCoach from '../pages/coach/ScheduleCoach'

import MemberDashboard from '../pages/member/MemberDashboard'
import Profile from '../pages/member/Profile'
import Progress from '../pages/member/Progress'
import Membership from '../pages/member/Membership'
import WorkoutPlansMember from '../pages/member/WorkoutPlansMember'
import NutritionPlansMember from '../pages/member/NutritionPlansMember'
import ExerciseVideosMember from '../pages/member/ExerciseVideosMember'
import Challanges from '../pages/member/Challanges'
import SupportMember from '../pages/member/SupportMember'
import Plans from '../pages/admin/Plans'


export const adminRoutes = [
    { path: 'dashboard', element: AdminDashboard },
    { path: 'payments', element: Payments },
    { path: 'membership-requests', element: Approvals },
    { path: 'members', element: Members },
    { path: 'coaches', element: Coaches },
    { path: 'attendance', element: Attendance },
    { path: 'plans', element: Plans },
    { path: 'schedule', element: Schedule },
    { path: 'support', element: Support },
    { path: 'settings', element: Settings },
]

export const coachRoutes = [
    { path: 'dashboard', element: CoachDashboard },
    { path: 'my-students', element: Students },
    { path: 'workout-plans', element: WorkoutPlans },
    { path: 'nutrition-plans', element: NutritionPlans },
    { path: 'exercise-videos', element: ExerciseVideos },
    { path: 'progress-tracking', element: ProgressTracking },
    { path: 'schedule', element: ScheduleCoach },
]

export const memberRoutes = [
    { path: 'dashboard', element: MemberDashboard },
    { path: 'profile', element: Profile },
    { path: 'progress', element: Progress },
    { path: 'membership', element: Membership },
    { path: 'workouts', element: WorkoutPlansMember },
    { path: 'nutrition-plans', element: NutritionPlansMember },
    { path: 'videos', element: ExerciseVideosMember },
    { path: 'challenges', element: Challanges },
    { path: 'support', element: SupportMember },
]