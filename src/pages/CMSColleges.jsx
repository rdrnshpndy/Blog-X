import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchingsorting from '../components/searchingsorting';

const CMSColleges = () => {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [courses, setCourses] = useState('');
  const [photo, setPhoto] = useState('');
  const [url, setUrl] = useState('');
  const [nirfRank, setNirfRank] = useState('');
  const [type, setType] = useState('');
  const [ownership, setOwnership] = useState('');
  const [branch, setBranch] = useState('');
  const [colleges, setColleges] = useState([]);
  const [editingSlug, setEditingSlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedSlugs, setSelectedSlugs] = useState([]);
  const [otherType, setOtherType] = useState('');
  const [address, setAddress] = useState('');
  const [nearestAirport, setNearestAirport] = useState('');
  const [nearestRailwayStation, setNearestRailwayStation] = useState('');
  const [overview, setOverview] = useState('');
    const [overviewPara1, setOverviewPara1] = useState('');
    const [overviewPara2, setOverviewPara2] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [officialWebsite, setOfficialWebsite] = useState('');
    const [googleMapsIframe, setGoogleMapsIframe] = useState('');
  const [founded, setFounded] = useState('');
  const [campusSize, setCampusSize] = useState('');
  const [students, setStudents] = useState('');
  const [faculty, setFaculty] = useState('');
  const [notableAlumni, setNotableAlumni] = useState('');
  const campusFacilitiesList = [
    'Bank/ATM', 'Library', 'Wi-Fi', 'Cafeteria', 'Hostel', 'Boys Hostel', 'Girls Hostel', 'Sports', 'Medical'
  ];
  const [campusFacilities, setCampusFacilities] = useState([]);
  const handleFacilityChange = (facility) => {
    setCampusFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  // Add new state for rankings and other info
  const [rankings, setRankings] = useState([{ type: '', value: '' }]);
  const [otherInfo, setOtherInfo] = useState('');

  const handleRankingChange = (idx, field, val) => {
    setRankings(rankings => rankings.map((r, i) => i === idx ? { ...r, [field]: val } : r));
  };
  const addRanking = () => setRankings([...rankings, { type: '', value: '' }]);
  const removeRanking = idx => setRankings(rankings => rankings.filter((_, i) => i !== idx));

  const [nearestMetroStation, setNearestMetroStation] = useState('');
  const [secondaryNearestRailwayStation, setSecondaryNearestRailwayStation] = useState('');

  // Admissions state
  const [applicationStatus, setApplicationStatus] = useState('');
  const [popularPrograms, setPopularPrograms] = useState('');
  const [feeRangeUG, setFeeRangeUG] = useState('');
  const [feeRangePG, setFeeRangePG] = useState('');
  const [studyMode, setStudyMode] = useState('');
  const [eligibilitySelection, setEligibilitySelection] = useState([{ course: '', eligibility: '', selection: '' }]);
  const [feesROI, setFeesROI] = useState([{ course: '', tuitionFee: '', avgPackage: '' }]);
  const [seatIntake, setSeatIntake] = useState([{ program: '', seats: '' }]);
  const [modeOfAdmission, setModeOfAdmission] = useState(['']);

  const handleEligibilityChange = (idx, field, val) => {
    setEligibilitySelection(list => list.map((row, i) => i === idx ? { ...row, [field]: val } : row));
  };
  const addEligibilityRow = () => setEligibilitySelection([...eligibilitySelection, { course: '', eligibility: '', selection: '' }]);
  const removeEligibilityRow = idx => setEligibilitySelection(list => list.filter((_, i) => i !== idx));

  const handleFeesROIChange = (idx, field, val) => {
    setFeesROI(list => list.map((row, i) => i === idx ? { ...row, [field]: val } : row));
  };
  const addFeesROIRow = () => setFeesROI([...feesROI, { course: '', tuitionFee: '', avgPackage: '' }]);
  const removeFeesROIRow = idx => setFeesROI(list => list.filter((_, i) => i !== idx));

  const handleSeatIntakeChange = (idx, field, val) => {
    setSeatIntake(list => list.map((row, i) => i === idx ? { ...row, [field]: val } : row));
  };
  const addSeatIntakeRow = () => setSeatIntake([...seatIntake, { program: '', seats: '' }]);
  const removeSeatIntakeRow = idx => setSeatIntake(list => list.filter((_, i) => i !== idx));

  const handleModeOfAdmissionChange = (idx, val) => {
    setModeOfAdmission(list => list.map((line, i) => i === idx ? val : line));
  };
  const addModeOfAdmissionLine = () => setModeOfAdmission([...modeOfAdmission, '']);
  const removeModeOfAdmissionLine = idx => setModeOfAdmission(list => list.filter((_, i) => i !== idx));

  // Courses Offered state
  const [coursesOffered, setCoursesOffered] = useState([
    { courseName: '', duration: '', branches: [''] }
  ]);
  const handleCourseChange = (idx, field, val) => {
    setCoursesOffered(list => list.map((c, i) => i === idx ? { ...c, [field]: val } : c));
  };
  const addCourse = () => setCoursesOffered([...coursesOffered, { courseName: '', duration: '', branches: [''] }]);
  const removeCourse = idx => setCoursesOffered(list => list.filter((_, i) => i !== idx));
  const handleBranchChange = (courseIdx, branchIdx, val) => {
    setCoursesOffered(list => list.map((c, i) => i === courseIdx ? { ...c, branches: c.branches.map((b, j) => j === branchIdx ? val : b) } : c));
  };
  const addBranch = (courseIdx) => {
    setCoursesOffered(list => list.map((c, i) => i === courseIdx ? { ...c, branches: [...c.branches, ''] } : c));
  };
  const removeBranch = (courseIdx, branchIdx) => {
    setCoursesOffered(list => list.map((c, i) => i === courseIdx ? { ...c, branches: c.branches.filter((_, j) => j !== branchIdx) } : c));
  };

  // Fee Structure state
  const [feeTables, setFeeTables] = useState([
    { tableName: '', rows: [{ particular: '', amount: '' }] }
  ]);
  const [feeWaivers, setFeeWaivers] = useState(['']);
  const handleFeeTableNameChange = (idx, val) => {
    setFeeTables(list => list.map((t, i) => i === idx ? { ...t, tableName: val } : t));
  };
  const addFeeTable = () => setFeeTables([...feeTables, { tableName: '', rows: [{ particular: '', amount: '' }] }]);
  const removeFeeTable = idx => setFeeTables(list => list.filter((_, i) => i !== idx));
  const handleFeeRowChange = (tableIdx, rowIdx, field, val) => {
    setFeeTables(list => list.map((t, i) => i === tableIdx ? { ...t, rows: t.rows.map((r, j) => j === rowIdx ? { ...r, [field]: val } : r) } : t));
  };
  const addFeeRow = (tableIdx) => {
    setFeeTables(list => list.map((t, i) => i === tableIdx ? { ...t, rows: [...t.rows, { particular: '', amount: '' }] } : t));
  };
  const removeFeeRow = (tableIdx, rowIdx) => {
    setFeeTables(list => list.map((t, i) => i === tableIdx ? { ...t, rows: t.rows.filter((_, j) => j !== rowIdx) } : t));
  };
  const handleFeeWaiverChange = (idx, val) => {
    setFeeWaivers(list => list.map((w, i) => i === idx ? val : w));
  };
  const addFeeWaiver = () => setFeeWaivers([...feeWaivers, '']);
  const removeFeeWaiver = idx => setFeeWaivers(list => list.filter((_, i) => i !== idx));

  // Placements state
  const [placements, setPlacements] = useState([
    {
      year: '',
      courses: [
        {
          courseName: '',
          branches: [{ branchName: '', percentage: '' }],
          overall: ''
        }
      ],
      medianPackage: '',
      averagePackage: '',
      recruiters: [{ name: '', imageUrl: '' }]
    }
  ]);
  const handlePlacementChange = (idx, field, val) => {
    setPlacements(list => list.map((p, i) => i === idx ? { ...p, [field]: val } : p));
  };
  const addPlacementYear = () => setPlacements([...placements, {
    year: '',
    courses: [{ courseName: '', branches: [{ branchName: '', percentage: '' }], overall: '' }],
    medianPackage: '',
    averagePackage: '',
    recruiters: [{ name: '', imageUrl: '' }]
  }]);
  const removePlacementYear = idx => setPlacements(list => list.filter((_, i) => i !== idx));
  const handleCourseChangePlacement = (yearIdx, courseIdx, field, val) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      courses: p.courses.map((c, j) => j === courseIdx ? { ...c, [field]: val } : c)
    } : p));
  };
  const addCoursePlacement = (yearIdx) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      courses: [...p.courses, { courseName: '', branches: [{ branchName: '', percentage: '' }], overall: '' }]
    } : p));
  };
  const removeCoursePlacement = (yearIdx, courseIdx) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      courses: p.courses.filter((_, j) => j !== courseIdx)
    } : p));
  };
  const handleBranchChangePlacement = (yearIdx, courseIdx, branchIdx, field, val) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      courses: p.courses.map((c, j) => j === courseIdx ? {
        ...c,
        branches: c.branches.map((b, k) => k === branchIdx ? { ...b, [field]: val } : b)
      } : c)
    } : p));
  };
  const addBranchPlacement = (yearIdx, courseIdx) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      courses: p.courses.map((c, j) => j === courseIdx ? {
        ...c,
        branches: [...c.branches, { branchName: '', percentage: '' }]
      } : c)
    } : p));
  };
  const removeBranchPlacement = (yearIdx, courseIdx, branchIdx) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      courses: p.courses.map((c, j) => j === courseIdx ? {
        ...c,
        branches: c.branches.filter((_, k) => k !== branchIdx)
      } : c)
    } : p));
  };
  const handleRecruiterChange = (yearIdx, recruiterIdx, field, val) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      recruiters: p.recruiters.map((r, j) => j === recruiterIdx ? { ...r, [field]: val } : r)
    } : p));
  };
  const addRecruiter = (yearIdx) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      recruiters: [...p.recruiters, { name: '', imageUrl: '' }]
    } : p));
  };
  const removeRecruiter = (yearIdx, recruiterIdx) => {
    setPlacements(list => list.map((p, i) => i === yearIdx ? {
      ...p,
      recruiters: p.recruiters.filter((_, j) => j !== recruiterIdx)
    } : p));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to access this page.');
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/colleges', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch colleges');
      }

      const data = await res.json();
      console.log('Fetched colleges:', data);
      setColleges(data);
    } catch (err) {
      console.error('Failed to fetch colleges:', err);
      toast.error('Failed to fetch colleges. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !state.trim() || !city.trim() || !url.trim() || !type.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const collegeData = {
      filter: {
        name: name.trim(),
        state: state.trim(),
        city: city.trim(),
        courses: courses.trim().split(',').map(course => course.trim()),
        photo: photo.trim(),
        url: url.trim(),
        nirfRank: parseInt(String(nirfRank).trim()),
        type: type === 'Other' ? otherType.trim() : type.trim(),
        ownership: ownership.trim(),
        branch: (Array.isArray(branch) ? branch.join(',') : branch).trim().split(',').map(course => course.trim()),
      },
      info: {
        overviewPara1: overviewPara1.trim(),
        overviewPara2: overviewPara2.trim(),
        founded: founded.trim(),
        campusSize: campusSize.trim(),
        students: students.trim(),
        faculty: faculty.trim(),
        notableAlumni: notableAlumni.trim(),
        nirfRank: nirfRank,
        otherInfo: otherInfo.trim(),
      },
      location: {
        address: address.trim(),
        nearestAirport: nearestAirport.trim(),
        nearestRailwayStation: nearestRailwayStation.trim(),
        nearestMetroStation: nearestMetroStation.trim(),
        secondaryNearestRailwayStation: secondaryNearestRailwayStation.trim(),
        campusFacilities,
        googleMapsIframe: googleMapsIframe.trim(),
        contactEmail: contactEmail.trim(),
        contactNumber: contactNumber.trim(),
        officialWebsite: officialWebsite.trim(),
      },
      admissions: {
        applicationStatus: applicationStatus.trim(),
        popularPrograms: popularPrograms.split(',').map(p => p.trim()).filter(Boolean),
        feeRangeUG: feeRangeUG.trim(),
        feeRangePG: feeRangePG.trim(),
        studyMode: studyMode.trim(),
        eligibilitySelection: eligibilitySelection.filter(row => row.course && row.eligibility && row.selection),
        feesROI: feesROI.filter(row => row.course && row.tuitionFee && row.avgPackage),
        seatIntake: seatIntake.filter(row => row.program && row.seats),
        modeOfAdmission: modeOfAdmission.filter(line => line.trim()),
      },
      coursesOffered: coursesOffered
        .filter(c => c.courseName && c.duration && c.branches.some(b => b.trim()))
        .map(c => ({
          courseName: c.courseName.trim(),
          duration: c.duration.trim(),
          branches: c.branches.map(b => b.trim()).filter(Boolean)
        })),
      feeStructure: {
        tables: feeTables
          .filter(t => t.tableName && t.rows.some(r => r.particular && r.amount))
          .map(t => ({
            tableName: t.tableName.trim(),
            rows: t.rows.map(r => ({ particular: r.particular.trim(), amount: r.amount.trim() })).filter(r => r.particular && r.amount)
          })),
        waivers: feeWaivers.map(w => w.trim()).filter(Boolean),
      },
      placements: placements
        .filter(p => p.year)
        .map(p => ({
          year: p.year.trim(),
          courses: p.courses.filter(c => c.courseName && (c.branches.some(b => b.branchName && b.percentage) || c.overall)).map(c => ({
            courseName: c.courseName.trim(),
            branches: c.branches.map(b => ({ branchName: b.branchName.trim(), percentage: b.percentage.trim() })).filter(b => b.branchName && b.percentage),
            overall: c.overall.trim()
          })),
          medianPackage: p.medianPackage.trim(),
          averagePackage: p.averagePackage.trim(),
          recruiters: p.recruiters.filter(r => r.name || r.imageUrl).map(r => ({ name: r.name.trim(), imageUrl: r.imageUrl.trim() }))
        })),
      rankings: rankings.filter(r => r.type && r.value),
    };

    const token = localStorage.getItem('token');
    const method = editingSlug ? 'PUT' : 'POST';

    try {
      const url = editingSlug
        ? `http://localhost:5001/api/colleges/${editingSlug}`
        : 'http://localhost:5001/api/colleges';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(collegeData),
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (response.ok) {
        toast.success(editingSlug ? 'College updated successfully!' : 'College created successfully!');
        resetForm();
        fetchColleges();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to save college.');
      }
    } catch (err) {
      console.error('Error saving college:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this college?')) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5001/api/colleges/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      if (res.ok) {
        setColleges(colleges.filter((college) => college.slug !== slug));
        toast.success('College deleted successfully!');
      } else {
        toast.error('Failed to delete college.');
      }
    } catch (err) {
      console.error('Error deleting college:', err);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleEdit = (college) => {
    setEditingSlug(college.slug);
    setName(college.filter?.name || '');
    setState(college.filter?.state || '');
    setCity(college.filter?.city || '');
    setCourses(college.filter?.courses ? college.filter.courses.join(',') : '');
    setPhoto(college.filter?.photo || '');
    setUrl(college.filter?.url || '');
    setNirfRank(college.filter?.nirfRank || '');
    setType(college.filter?.type || '');
    setOwnership(college.filter?.ownership || '');
    setBranch(college.filter?.branch ? college.filter.branch.join(',') : '');
    setAddress(college.location?.address || '');
    setNearestAirport(college.location?.nearestAirport || '');
    setNearestRailwayStation(college.location?.nearestRailwayStation || '');
    setNearestMetroStation(college.location?.nearestMetroStation || '');
    setSecondaryNearestRailwayStation(college.location?.secondaryNearestRailwayStation || '');
    setOverviewPara1(college.info?.overviewPara1 || '');
    setOverviewPara2(college.info?.overviewPara2 || '');
    setFounded(college.info?.founded || '');
    setCampusSize(college.info?.campusSize || '');
    setStudents(college.info?.students || '');
    setFaculty(college.info?.faculty || '');
    setNotableAlumni(college.info?.notableAlumni || '');
    setCampusFacilities(college.location?.campusFacilities || []);
    setRankings(college.rankings || [{ type: '', value: '' }]);
    setOtherInfo(college.info?.otherInfo || '');
    setContactEmail(college.location?.contactEmail || '');
    setContactNumber(college.location?.contactNumber || '');
    setOfficialWebsite(college.location?.officialWebsite || '');
    setGoogleMapsIframe(college.location?.googleMapsIframe || '');
    // Admissions
    setEligibilitySelection(college.admissions?.eligibilitySelection || [{ course: '', eligibility: '', selection: '' }]);
    setFeesROI(college.admissions?.feesROI || [{ course: '', tuitionFee: '', avgPackage: '' }]);
    setSeatIntake(college.admissions?.seatIntake || [{ program: '', seats: '' }]);
    setModeOfAdmission(college.admissions?.modeOfAdmission || ['']);
    setApplicationStatus(college.admissions?.applicationStatus || '');
    setPopularPrograms(college.admissions?.popularPrograms ? college.admissions.popularPrograms.join(', ') : '');
    setFeeRangeUG(college.admissions?.feeRangeUG || '');
    setFeeRangePG(college.admissions?.feeRangePG || '');
    setStudyMode(college.admissions?.studyMode || '');
    // Courses Offered
    setCoursesOffered(college.coursesOffered || [{ courseName: '', duration: '', branches: [''] }]);
    // Fee Structure
    setFeeTables(college.feeStructure?.tables || [{ tableName: '', rows: [{ particular: '', amount: '' }] }]);
    setFeeWaivers(college.feeStructure?.waivers || ['']);
    // Placements
    setPlacements(college.placements || [{
      year: '',
      courses: [
        { courseName: '', branches: [{ branchName: '', percentage: '' }], overall: '' }
      ],
      medianPackage: '',
      averagePackage: '',
      recruiters: [{ name: '', imageUrl: '' }]
    }]);
    setIsCreateVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOtherType(college.filter?.type === 'Other' ? college.filter.type : '');
  };

  const resetForm = () => {
    setEditingSlug(null);
    setName('');
    setState('');
    setCity('');
    setCourses('');
    setPhoto('');
    setUrl('');
    setNirfRank('');
    setType('');
    setOwnership('');
    setBranch('');
    setAddress('');
    setNearestAirport('');
    setNearestRailwayStation('');
    setNearestMetroStation('');
    setSecondaryNearestRailwayStation('');
    setOverview('');
      setOverviewPara1('');
      setOverviewPara2('');
    setFounded('');
    setCampusSize('');
    setStudents('');
    setFaculty('');
    setNotableAlumni('');
    setCampusFacilities([]);
    setRankings([{ type: '', value: '' }]);
    setOtherInfo('');
    setOtherType('');
    setContactEmail('');
    setContactNumber('');
    setOfficialWebsite('');
    setGoogleMapsIframe('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSelectRow = (slug) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSlugs(colleges.map((college) => college.slug));
    } else {
      setSelectedSlugs([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedSlugs.length === 0) return;
    if (!window.confirm(`Delete ${selectedSlugs.length} selected college(s)?`)) return;
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selectedSlugs.map((slug) =>
          fetch(`http://localhost:5001/api/colleges/${slug}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      toast.success('Selected colleges deleted!');
      setSelectedSlugs([]);
      fetchColleges();
    } catch (err) {
      toast.error('Failed to delete selected colleges.');
    }
  };

  const getFilteredSortedPosts = () => {
    let filtered = colleges;
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          (post.filter?.name && post.filter.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.filter?.state && post.filter.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.filter?.city && post.filter.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.filter?.type && post.filter.type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (sortBy === 'az') {
      filtered = [...filtered].sort((a, b) => (a.filter?.name || '').localeCompare(b.filter?.name || ''));
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'datei') {
      filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return filtered;
  };

  return (
    <div className="bg-gray-300 min-h-screen w-full p-5">
      <ToastContainer />

      <button
        onClick={() => setIsCreateVisible(!isCreateVisible)}
        className={`text-white font-bold py-2 px-4 rounded mb-4 ${isCreateVisible ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'}`}
      >
        {isCreateVisible ? 'Hide Section' : 'Add College'}
      </button>

      {isCreateVisible && (
        <div className="bg-white w-full mx-auto mb-12 rounded-xl shadow-lg border border-gray-200 p-5 md:p-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-orange-500 tracking-tight">
            {editingSlug ? 'Edit College' : 'Add College'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8" encType="multipart/form-data">
            {/* FILTER SECTION */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Filter Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="College Name" className="input w-full" value={name} onChange={e => setName(e.target.value)} required aria-label="College name" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="State" className="input w-full" value={state} onChange={e => setState(e.target.value)} aria-label="State" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="City" className="input w-full" value={city} onChange={e => setCity(e.target.value)} aria-label="City" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Photo URL" className="input w-full" value={photo} onChange={e => setPhoto(e.target.value)} aria-label="Photo URL" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="College URL" className="input w-full" value={url} onChange={e => setUrl(e.target.value)} aria-label="College URL" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="number" placeholder="NIRF Rank" className="input w-full" value={nirfRank} onChange={e => setNirfRank(e.target.value)} aria-label="NIRF Rank" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><select className="input w-full" value={type} onChange={e => setType(e.target.value)} aria-label="Type" required>
                  <option value="">Select Type</option>
                  <option value="IIT">IIT</option>
                  <option value="NIT">NIT</option>
                  <option value="IIIT">IIIT</option>
                  <option value="BITS">BITS</option>
                  <option value="Other">Other</option>
                </select></div>
                {type === 'Other' && (
                  <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Enter College Type" className="input w-full" value={otherType} onChange={e => setOtherType(e.target.value)} aria-label="Other College Type" required /></div>
                )}
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><select className="input w-full" value={ownership} onChange={e => setOwnership(e.target.value)} aria-label="Ownership" required>
                  <option value="">Select Ownership</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="PPP">PPP</option>
                </select></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Courses (comma-separated)" className="input w-full" value={courses} onChange={e => setCourses(e.target.value)} aria-label="Courses" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Branch (comma-separated)" className="input w-full" value={branch} onChange={e => setBranch(e.target.value)} aria-label="Branch" /></div>
              </div>
            </div>
            {/* INFO SECTION */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-green-700 mb-4">Info</h3>
              {/* Main Overview */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Overview (Main)</label>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <textarea placeholder="Main overview (e.g. intro, reputation, campus life)" className="input w-full min-h-[80px]" value={overviewPara1} onChange={e => setOverviewPara1(e.target.value)} aria-label="Overview Paragraph 1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" placeholder="Founded (e.g. 1961)" className="input w-full" value={founded} onChange={e => setFounded(e.target.value)} aria-label="Founded" />
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" placeholder="NIRF Rank (e.g. #3 (Engineering))" className="input w-full" value={nirfRank} onChange={e => setNirfRank(e.target.value)} aria-label="NIRF Rank" />
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" placeholder="Campus Size (e.g. 325 acres)" className="input w-full" value={campusSize} onChange={e => setCampusSize(e.target.value)} aria-label="Campus Size" />
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" placeholder="Students (e.g. 11,000+)" className="input w-full" value={students} onChange={e => setStudents(e.target.value)} aria-label="Students" />
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" placeholder="Faculty (e.g. 600+)" className="input w-full" value={faculty} onChange={e => setFaculty(e.target.value)} aria-label="Faculty" />
                </div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" placeholder="Notable Alumni (comma-separated)" className="input w-full" value={notableAlumni} onChange={e => setNotableAlumni(e.target.value)} aria-label="Notable Alumni" />
                </div>
              </div>
              {/* Secondary Overview */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Overview (Secondary)</label>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                  <textarea placeholder="Secondary overview (e.g. alumni, global impact, legacy)" className="input w-full min-h-[80px]" value={overviewPara2} onChange={e => setOverviewPara2(e.target.value)} aria-label="Overview Paragraph 2" />
                </div>
              </div>
            </div>
            {/* LOCATION SECTION */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Location & Campus Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="email" placeholder="Email" className="input w-full" value={contactEmail} onChange={e => setContactEmail(e.target.value)} aria-label="Contact Email" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Contact No." className="input w-full" value={contactNumber} onChange={e => setContactNumber(e.target.value)} aria-label="Contact Number" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Address" className="input w-full" value={address} onChange={e => setAddress(e.target.value)} aria-label="Address" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Official Website" className="input w-full" value={officialWebsite} onChange={e => setOfficialWebsite(e.target.value)} aria-label="Official Website" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Nearest Airport" className="input w-full" value={nearestAirport} onChange={e => setNearestAirport(e.target.value)} aria-label="Nearest Airport" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Nearest Railway Station" className="input w-full" value={nearestRailwayStation} onChange={e => setNearestRailwayStation(e.target.value)} aria-label="Nearest Railway Station" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Nearest Metro Station" className="input w-full" value={nearestMetroStation} onChange={e => setNearestMetroStation(e.target.value)} aria-label="Nearest Metro Station" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" placeholder="Secondary Nearest Railway Station" className="input w-full" value={secondaryNearestRailwayStation} onChange={e => setSecondaryNearestRailwayStation(e.target.value)} aria-label="Secondary Nearest Railway Station" /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2 md:col-span-2"><input type="text" placeholder="Google Maps Iframe" className="input w-full" value={googleMapsIframe} onChange={e => setGoogleMapsIframe(e.target.value)} aria-label="Google Maps Iframe" /></div>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Campus Facilities</label>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2 flex flex-wrap gap-2">
                  {campusFacilitiesList.map(facility => (
                    <label key={facility} className="inline-flex items-center mr-4">
                      <input type="checkbox" className="form-checkbox" checked={campusFacilities.includes(facility)} onChange={() => handleFacilityChange(facility)} />
                      <span className="ml-2 text-sm">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RANKINGS SECTION */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-yellow-700 mb-4">Rankings</h3>
              {rankings.map((ranking, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                  <input type="text" className="input w-full flex-1" placeholder="Ranking Type (e.g. NIRF, QS)" value={ranking.type} onChange={e => handleRankingChange(idx, 'type', e.target.value)} />
                  <input type="text" className="input w-full flex-1" placeholder="Value (e.g. #3, 2023)" value={ranking.value} onChange={e => handleRankingChange(idx, 'value', e.target.value)} />
                  <button type="button" className="text-red-500 font-bold px-2" onClick={() => removeRanking(idx)} disabled={rankings.length === 1}>×</button>
                </div>
              ))}
              <button type="button" className="mt-2 px-4 py-1 bg-yellow-200 rounded text-yellow-900 font-semibold" onClick={addRanking}>Add Ranking</button>
            </div>

            {/* OTHER INFO SECTION */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Other Info</h3>
              <div className="bg-white border border-gray-200 shadow-sm rounded p-2">
                <textarea className="input w-full min-h-[60px]" placeholder="Any extra notes or info..." value={otherInfo} onChange={e => setOtherInfo(e.target.value)} />
              </div>
            </div>
            {/* ADMISSIONS SECTION */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Admissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" className="input w-full" placeholder="Application Status (e.g. Open)" value={applicationStatus} onChange={e => setApplicationStatus(e.target.value)} /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" className="input w-full" placeholder="Popular Programs (comma-separated)" value={popularPrograms} onChange={e => setPopularPrograms(e.target.value)} /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" className="input w-full" placeholder="Fee Range UG (e.g. ₹8L - ₹8.7L)" value={feeRangeUG} onChange={e => setFeeRangeUG(e.target.value)} /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" className="input w-full" placeholder="Fee Range PG (e.g. ₹30k - ₹12.6L)" value={feeRangePG} onChange={e => setFeeRangePG(e.target.value)} /></div>
                <div className="bg-white border border-gray-200 shadow-sm rounded p-2"><input type="text" className="input w-full" placeholder="Study Mode (e.g. Full-time)" value={studyMode} onChange={e => setStudyMode(e.target.value)} /></div>
              </div>
              {/* Eligibility & Selection Criteria Table */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Eligibility & Selection Criteria</label>
                {eligibilitySelection.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                    <input type="text" className="input w-full flex-1" placeholder="Course" value={row.course} onChange={e => handleEligibilityChange(idx, 'course', e.target.value)} />
                    <input type="text" className="input w-full flex-1" placeholder="Eligibility" value={row.eligibility} onChange={e => handleEligibilityChange(idx, 'eligibility', e.target.value)} />
                    <input type="text" className="input w-full flex-1" placeholder="Selection" value={row.selection} onChange={e => handleEligibilityChange(idx, 'selection', e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2" onClick={() => removeEligibilityRow(idx)} disabled={eligibilitySelection.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-1 bg-blue-200 rounded text-blue-900 font-semibold" onClick={addEligibilityRow}>Add Row</button>
              </div>
              {/* Fees & ROI Table */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Fees & Return on Investment (ROI)</label>
                {feesROI.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                    <input type="text" className="input w-full flex-1" placeholder="Course" value={row.course} onChange={e => handleFeesROIChange(idx, 'course', e.target.value)} />
                    <input type="text" className="input w-full flex-1" placeholder="Tuition Fee" value={row.tuitionFee} onChange={e => handleFeesROIChange(idx, 'tuitionFee', e.target.value)} />
                    <input type="text" className="input w-full flex-1" placeholder="Avg. Package" value={row.avgPackage} onChange={e => handleFeesROIChange(idx, 'avgPackage', e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2" onClick={() => removeFeesROIRow(idx)} disabled={feesROI.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-1 bg-blue-200 rounded text-blue-900 font-semibold" onClick={addFeesROIRow}>Add Row</button>
              </div>
              {/* Seat Intake Table */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Seat Intake (2025)</label>
                {seatIntake.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                    <input type="text" className="input w-full flex-1" placeholder="Program" value={row.program} onChange={e => handleSeatIntakeChange(idx, 'program', e.target.value)} />
                    <input type="text" className="input w-full flex-1" placeholder="Seats" value={row.seats} onChange={e => handleSeatIntakeChange(idx, 'seats', e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2" onClick={() => removeSeatIntakeRow(idx)} disabled={seatIntake.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-1 bg-blue-200 rounded text-blue-900 font-semibold" onClick={addSeatIntakeRow}>Add Row</button>
              </div>
              {/* Mode of Admission */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Mode of Admission</label>
                {modeOfAdmission.map((line, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 shadow-sm rounded p-2 mb-2 flex items-center gap-2">
                    <textarea className="input w-full min-h-[40px]" placeholder="Mode of admission step..." value={line} onChange={e => handleModeOfAdmissionChange(idx, e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeModeOfAdmissionLine(idx)} disabled={modeOfAdmission.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-1 bg-blue-200 rounded text-blue-900 font-semibold" onClick={addModeOfAdmissionLine}>Add Line</button>
              </div>
            </div>
            {/* Courses Offered Section */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">Courses Offered</h3>
              {coursesOffered.map((course, idx) => (
                <div key={idx} className="mb-6 bg-white border border-gray-200 shadow-sm rounded p-4">
                  <div className="flex gap-2 mb-2 items-center">
                    <input type="text" className="input w-full flex-1" placeholder="Course Name (e.g. B.Tech)" value={course.courseName} onChange={e => handleCourseChange(idx, 'courseName', e.target.value)} />
                    <input type="text" className="input w-full flex-1" placeholder="Duration (e.g. 4 Years)" value={course.duration} onChange={e => handleCourseChange(idx, 'duration', e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeCourse(idx)} disabled={coursesOffered.length === 1}>×</button>
                  </div>
                  <label className="block font-semibold mb-1">Branches</label>
                  {course.branches.map((branch, bIdx) => (
                    <div key={bIdx} className="flex gap-2 mb-2 items-center">
                      <input type="text" className="input w-full flex-1" placeholder="Branch Name (e.g. Aerospace Engineering)" value={branch} onChange={e => handleBranchChange(idx, bIdx, e.target.value)} />
                      <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeBranch(idx, bIdx)} disabled={course.branches.length === 1}>×</button>
                    </div>
                  ))}
                  <button type="button" className="mt-2 px-4 py-1 bg-indigo-200 rounded text-indigo-900 font-semibold" onClick={() => addBranch(idx)}>Add Branch</button>
                </div>
              ))}
              <button type="button" className="mt-2 px-4 py-1 bg-indigo-200 rounded text-indigo-900 font-semibold" onClick={addCourse}>Add Course</button>
            </div>
            {/* Fee Structure Section */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-pink-700 mb-4">Fee Structure</h3>
              {feeTables.map((table, tIdx) => (
                <div key={tIdx} className="mb-6 bg-white border border-gray-200 shadow-sm rounded p-4">
                  <div className="flex gap-2 mb-2 items-center">
                    <input type="text" className="input w-full flex-1" placeholder="Table Name (e.g. Institute Fee)" value={table.tableName} onChange={e => handleFeeTableNameChange(tIdx, e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeFeeTable(tIdx)} disabled={feeTables.length === 1}>×</button>
                  </div>
                  <label className="block font-semibold mb-1">Rows</label>
                  {table.rows.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-2 mb-2 items-center">
                      <input type="text" className="input w-full flex-1" placeholder="Particular" value={row.particular} onChange={e => handleFeeRowChange(tIdx, rIdx, 'particular', e.target.value)} />
                      <input type="text" className="input w-full flex-1" placeholder="Amount" value={row.amount} onChange={e => handleFeeRowChange(tIdx, rIdx, 'amount', e.target.value)} />
                      <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeFeeRow(tIdx, rIdx)} disabled={table.rows.length === 1}>×</button>
                    </div>
                  ))}
                  <button type="button" className="mt-2 px-4 py-1 bg-pink-200 rounded text-pink-900 font-semibold" onClick={() => addFeeRow(tIdx)}>Add Row</button>
                </div>
              ))}
              <button type="button" className="mt-2 px-4 py-1 bg-pink-200 rounded text-pink-900 font-semibold" onClick={addFeeTable}>Add Table</button>
              <div className="mt-6">
                <label className="block font-semibold mb-1">Fee Waivers</label>
                {feeWaivers.map((waiver, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                    <textarea className="input w-full min-h-[40px]" placeholder="Fee waiver description..." value={waiver} onChange={e => handleFeeWaiverChange(idx, e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeFeeWaiver(idx)} disabled={feeWaivers.length === 1}>×</button>
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-1 bg-pink-200 rounded text-pink-900 font-semibold" onClick={addFeeWaiver}>Add Waiver</button>
              </div>
            </div>
            {/* Placements Section */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-4 border border-gray-200">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Placements</h3>
              {placements.map((placement, pIdx) => (
                <div key={pIdx} className="mb-6 bg-white border border-gray-200 shadow-sm rounded p-4">
                  <div className="flex gap-2 mb-2 items-center">
                    <input type="text" className="input w-full flex-1" placeholder="Year (e.g. 2024)" value={placement.year} onChange={e => handlePlacementChange(pIdx, 'year', e.target.value)} />
                    <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removePlacementYear(pIdx)} disabled={placements.length === 1}>×</button>
                  </div>
                  <label className="block font-semibold mb-1">Courses</label>
                  {placement.courses.map((course, cIdx) => (
                    <div key={cIdx} className="mb-4 bg-gray-50 border border-gray-200 shadow-sm rounded p-3">
                      <div className="flex gap-2 mb-2 items-center">
                        <input type="text" className="input w-full flex-1" placeholder="Course Name (e.g. B.Tech)" value={course.courseName} onChange={e => handleCourseChangePlacement(pIdx, cIdx, 'courseName', e.target.value)} />
                        <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeCoursePlacement(pIdx, cIdx)} disabled={placement.courses.length === 1}>×</button>
                      </div>
                      <label className="block font-semibold mb-1">Branches</label>
                      {course.branches.map((branch, bIdx) => (
                        <div key={bIdx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                          <input type="text" className="input w-full flex-1" placeholder="Branch Name (e.g. Aerospace Engineering)" value={branch.branchName} onChange={e => handleBranchChangePlacement(pIdx, cIdx, bIdx, 'branchName', e.target.value)} />
                          <input type="text" className="input w-full flex-1" placeholder="Placed (%)" value={branch.percentage} onChange={e => handleBranchChangePlacement(pIdx, cIdx, bIdx, 'percentage', e.target.value)} />
                          <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeBranchPlacement(pIdx, cIdx, bIdx)} disabled={course.branches.length === 1}>×</button>
                        </div>
                      ))}
                      <button type="button" className="mt-2 px-4 py-1 bg-green-200 rounded text-green-900 font-semibold" onClick={() => addBranchPlacement(pIdx, cIdx)}>Add Branch</button>
                      <div className="mt-2">
                        <input type="text" className="input w-full" placeholder="Overall Placed (%) for this course" value={course.overall} onChange={e => handleCourseChangePlacement(pIdx, cIdx, 'overall', e.target.value)} />
                      </div>
                    </div>
                  ))}
                  <button type="button" className="mt-2 px-4 py-1 bg-green-200 rounded text-green-900 font-semibold" onClick={() => addCoursePlacement(pIdx)}>Add Course</button>
                  <div className="mt-4">
                    <input type="text" className="input w-full mb-2" placeholder="Median Package (e.g. Rs. 17.92 lakhs per Annum)" value={placement.medianPackage} onChange={e => handlePlacementChange(pIdx, 'medianPackage', e.target.value)} />
                    <input type="text" className="input w-full mb-2" placeholder="Average Package (e.g. Rs. 23.50 lakhs per annum)" value={placement.averagePackage} onChange={e => handlePlacementChange(pIdx, 'averagePackage', e.target.value)} />
                  </div>
                  <div className="mt-4">
                    <label className="block font-semibold mb-1">Past Recruiters</label>
                    {placement.recruiters.map((recruiter, rIdx) => (
                      <div key={rIdx} className="flex gap-2 mb-2 items-center bg-white border border-gray-200 shadow-sm rounded p-2">
                        <input type="text" className="input w-full flex-1" placeholder="Recruiter Name" value={recruiter.name} onChange={e => handleRecruiterChange(pIdx, rIdx, 'name', e.target.value)} />
                        <input type="text" className="input w-full flex-1" placeholder="Image URL" value={recruiter.imageUrl} onChange={e => handleRecruiterChange(pIdx, rIdx, 'imageUrl', e.target.value)} />
                        <button type="button" className="text-red-500 font-bold px-2 h-8" onClick={() => removeRecruiter(pIdx, rIdx)} disabled={placement.recruiters.length === 1}>×</button>
                      </div>
                    ))}
                    <button type="button" className="mt-2 px-4 py-1 bg-green-200 rounded text-green-900 font-semibold" onClick={() => addRecruiter(pIdx)}>Add Recruiter</button>
                  </div>
                </div>
              ))}
              <button type="button" className="mt-2 px-4 py-1 bg-green-200 rounded text-green-900 font-semibold" onClick={addPlacementYear}>Add Year</button>
            </div>
            <div className="flex gap-4 justify-end">
              <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-8 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all duration-300" aria-label={editingSlug ? 'Update post' : 'Create post'}>
                {editingSlug ? 'Update College' : 'Create College'}
              </button>
              {editingSlug && (
                <button type="button" onClick={resetForm} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 px-8 rounded-lg font-semibold shadow hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300" aria-label="Cancel edit">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">All Colleges</h2>
        </div>
        <div className="flex flex-wrap md:items-center md:justify-between gap-4 mb-6">
          <div className="w-full md:w-auto flex md:flex-row gap-2 md:gap-4 items-stretch md:items-center justify-end">
            <Searchingsorting onSearch={setSearchTerm} onSort={setSortBy} />
          </div>
          <div>
            <button
              className={`bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={selectedSlugs.length === 0}
              onClick={handleDeleteSelected}
            >
              <div style={{ display: 'inline-block' }}>Delete&nbsp;Selected</div>
            </button>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <colgroup>
                <col />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
                <col style={{ width: '8.33%' }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2 rounded-tl-lg">
                    <input type="checkbox" onChange={handleSelectAll} aria-label="Select all colleges" />
                  </th>
                  <th className="pl-2 py-2">Photo</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">State</th>
                  <th className="px-2 py-2">City</th>
                  <th className="px-2 py-2">Courses</th>
                  <th className="px-2 py-2">URL</th>
                  <th className="px-2 py-2">NIRF Rank</th>
                  <th className="px-2 py-2">Type</th>
                  <th className="px-2 py-2">Ownership</th>
                  <th className="px-2 py-2">Branch</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.length > 0 ? (
                  colleges.map((college) => (
                    <tr
                      key={college.slug}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow transition-all"
                      style={{ height: '64px', maxHeight: '64px' }}
                    >
                      <td className="pl-2 py-2 align-middle">
                        <input
                          type="checkbox"
                          checked={selectedSlugs.includes(college.slug)}
                          onChange={() => handleSelectRow(college.slug)}
                          aria-label={`Select college ${college.filter?.name}`}
                        />
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <img src={college.filter?.photo} alt="College Photo" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm font-semibold text-gray-900" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.name}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.state || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.city || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-sm" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.courses || 'None'}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.url}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.nirfRank}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.type}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.ownership}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="line-clamp-2 break-words text-xs text-orange-500" style={{ maxHeight: '2.6em', overflow: 'hidden' }}>
                          {college.filter?.branch}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-middle">
                        <div className="flex flex-row gap-2 items-center justify-center h-full">
                          <button
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded hover:from-red-600 hover:to-red-700 text-xs"
                            onClick={() => handleDelete(college.slug)}
                            aria-label={`Delete college ${college.filter?.name}`}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded hover:from-yellow-500 hover:to-yellow-600 text-xs"
                            onClick={() => handleEdit(college)}
                            aria-label={`Edit college ${college.filter?.name}`}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-gray-400 py-8 font-semibold">
                      No colleges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSColleges;

