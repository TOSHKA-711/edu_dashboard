// ================= student ==================
export type StudentType = {
  id: number;
  first_name: string | null;
  last_name: string;
  username: string | null;
  identity_id: string | null;
  email: string | null;
  phone_number: string | null;
  image: string;
  color: string | null;
  date_of_birth: string;
  school_name: string | null;
  grade_name: string | null;
  educational_stage: string | null;
  neighborhood: string | null;
  parent_id: number | null;
  parent_type: string | null;
  child_type: "male" | "female";
  mother_name: string | null;
  mother_identity_id: number | null;
  points: number | null;
  first_enrolled_course: string | null;
  full_name?: string;
  children_count?: number;
};
export type GetAllStudentsResponseType = {
  status: boolean;
  message: string;
  data: StudentType[];
};

// viewed student courses

export type StudentCourseType = {
  id: number;
  status: string;
  amount_paid: string;
  remaining_amount: string;
  payment_status: string;
  attendance_percentage: number;
  course: {
    id: number;
    title: string;
    description: string;
    price: string;
    earnings_point: number;
    address: string;
    start_date: string;
    end_date: string;
    max_people: number;
    image: string;
    age_range: number;
    session_count: number;
    instructor: {
      id: number;
      first_name: string;
      last_name: string;
      image: string;
      date_of_birth: string;
      bio: string;
      info: string;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    active: number;
    type: string;
    category: {
      id: number;
      name: string;
      image: string;
    };
    rate_avg: number;
  };
};

export type AllStudentCoursesType = {
  status: boolean;
  message: string;
  data: StudentCourseType[];
};

// edit student
export type StudentPayloadType = {
  full_name?: string;
  first_name: string;
  last_name: string;
  identity_id: string;
  phone: string;
  email?: string;
  image?: File | null;
  date_of_birth: string;
  parent_id: string;
  mother_id: string;
  student_type: string;
  neighborhood: string;
  educational_stage: string;
  school_name: string;
  grade_name: string;
};

//=================== parent =======================

export type ParentType = {
  id: number;
  first_name: string;
  last_name: string;
  username: string | null;
  identity_id: string;
  email: string;
  phone_number: string;
  image: string;
  color: string | null;
  date_of_birth: string;
  school_name: string | null;
  grade_name: string | null;
  educational_stage: string | null;
  neighborhood: string;
  parent_id: number | null;
  parent_type: string;
  child_type: string | null;
  mother_name: string | null;
  mother_identity_id: string | null;
  points: number | null;
  first_enrolled_course: string | null;
};

export type GetAllParentsResponseType = {
  status: boolean;
  message: string;
  data: ParentType[];
};

export type ParentChildType = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  identity_id: string | null;
  phone_number: string | null;
  email: string | null;
  image: string;
  color: string;
  verify_code: string;
  role: "child" | string;
  date_of_birth: string;
  school_name: string | null;
  grade_name: string | null;
  educational_stage: string | null;
  neighborhood: string | null;
  parent_id: number;
  parent_type: string | null;
  child_type: "female" | "male" | string;
  status: number;
  mother_name: string | null;
  mother_identity_id: string | null;
  points: number;
  balance: number | null;
  created_at: string;
  updated_at: string;
};

export type GetAllParentChildrenResponseType = {
  status: boolean;
  message: string;
  data: ParentChildType[];
};

//=================== instructors =======================

export type InstructorType = {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  date_of_birth: string;
  bio: string;
  info: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GetAllInstructorsResponseType = {
  status: boolean;
  message: string;
  data: InstructorType[];
};

export type InstructorCourseType = {
  id: number;
  title: string;
  description: string;
  price: string;
  earnings_point: number;
  address: string;
  start_date: string;
  end_date: string;
  max_people: number;
  image: string;
  age_range: number;
  session_count: number;
  instructor: {
    id: number;
    first_name: string;
    last_name: string;
    image: string;
    date_of_birth: string;
    bio: string;
    info: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
  };
  active: number;
  type: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  rate_avg: number;
};

export type AllInstructorCoursesType = {
  status: boolean;
  message: string;
  data: InstructorCourseType[];
};

export type InstructorPayloadType = {
  full_name?: string;
  first_name: string;
  last_name: string;
  image?: File | null;
  date_of_birth: string;
  bio: string;
  info: string;
};

export type InstructorRateType ={
  rating: number;
  review: string;
  is_accept: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    image: string;
};
};
export type AllInstructorRatesResponseType ={
  status: boolean;
  message: string;
  data: InstructorRateType[];
}
